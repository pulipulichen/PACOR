/* global Promise */

'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const ReadingProgressModel = use('App/Models/ReadingProgress')
const UserModel = use('App/Models/User')

const AuthHelper = use('App/Helpers/AuthHelper')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const dayjs = use('dayjs')
const SpreadsheetHelper = use('App/Helpers/SpreadsheetHelper')

class GroupDashboard {
  
  async info ({request, auth}) {
    let {webpageID, groupID, dashboardFilterMode} = request.all()
    //console.log(webpageID)
    let webpage = await AuthHelper.checkDomainAdmin(auth, webpageID)
    //console.log([webpageID, groupID])
    let cacheKey = Cache.key('GroupDashboard', 'info', webpageID, groupID, dashboardFilterMode)
    
    return await Cache.get(cacheKey, async () => {
      
      let users = await this._getGroupReaderCard(webpage, groupID, dashboardFilterMode)
      let socialNetworks = await this.getSocialNetworks(webpage, users)
      let groupIndicators = await this.calcGroupIndicators(webpage, groupID, dashboardFilterMode)
      
      let group = {
        users,
        socialNetworks
      }
      
      //console.log(group.group_seq_id)
      
      // -----------------------------

      let webpageURL = webpage.url
      let output = {
        webpageURL: webpageURL,
        group,
        groupIndicators
      }
      Cache.put(cacheKey, output, 0.5)
      return output
    })
  }
  
  async _getGroupReaderCard (webpage, groupID, dashboardFilterMode) {
    let output = []
    let group = await webpage.getGroup(groupID)
    let users
    if (dashboardFilterMode === 'onlyCompleted') {
      users = await group.getCompletedUsers()
    }
    else {
      users = await group.users().fetch()
    }
    //let users = await group.users().fetch()
    
    let usersJSON = users.toJSON()
    for (let u = 0; u < usersJSON.length; u++) {
      let user = users.nth(u)
      let userJSON = usersJSON[u]
      //let userJSON = user.toJSON()
      userJSON.readingProgresses = await user.getReadingProgressStatus(webpage)

      userJSON.created_at = dayjs(user.created_at).unix()
      userJSON.latest_log_unixms = await user.getLatestLogUnixMS(webpage)

      // For test
      //userJSON.readingProgresses[0].isCompleted = true
      //userJSON.readingProgresses[0].start_timestamp = 1
      //userJSON.readingProgresses[0].end_timestamp = 10000
      //userJSON.readingProgresses[1].start_timestamp = 10001

      output.push(userJSON)
    }
    
    output.sort((a, b) => {
      var nameA = a.display_name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.display_name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    
    return output
  }
  
  _calcCollaborativeReadingTimes (users) {
    let baseTimestamp, firstTimestamp, lastTimestamp
    
    users.forEach(user => {
      if (Array.isArray(user.readingProgresses) === false) {
        return false
      }
      
      for (let i = 0; i < user.readingProgresses.length; i++) {
        let step = user.readingProgresses[i]
        
        let {start_timestamp, end_timestamp} = step
        if (!baseTimestamp || baseTimestamp > start_timestamp) {
          baseTimestamp = start_timestamp
        }
        
        if (step.step_name !== "CollaborativeReading") {
          continue
        }
        if (!firstTimestamp || firstTimestamp > start_timestamp) {
          firstTimestamp = start_timestamp
        }
        if (!lastTimestamp || lastTimestamp < end_timestamp) {
          lastTimestamp = end_timestamp
        }
        break
      }
    })
    
    let middleTimestamp = Math.round((firstTimestamp + lastTimestamp) / 2)
    
    return [
      baseTimestamp,
      firstTimestamp,
      middleTimestamp,
      lastTimestamp
    ]
  }
  
  _calcTimeList (collaborativeReadingTimes) {
    let timelist = []
    
    let firstTimestamp = collaborativeReadingTimes[0]
    for (let i = 1; i < collaborativeReadingTimes.length; i++) {
      timelist.push({
        startTimestamp: firstTimestamp,
        endTimestamp: collaborativeReadingTimes[i]
      })
    }
    
    return timelist
  }
  
  async getSocialNetworks (webpage, users) {
    
    let collaborativeReadingTimes = this._calcCollaborativeReadingTimes(users)
    let timelist = this._calcTimeList(collaborativeReadingTimes)
    
    //let socialNetworks = await Promise.all(timelist.map(async (timestamps) => {
    let socialNetworks = []
    for (let i = 0; i < timelist.length; i++) {
      let {startTimestamp, endTimestamp} = timelist[i]
      
      
      let nodes = []
      let edges = []
      
      //await Promise.all(users.map(async (userJSON) => {
      for (let j = 0; j < users.length; j++) {
        let {id, username, display_name} = users[j]
        let user = await UserModel.find(id)
        
        if (!display_name) {
          display_name = username
        }
        
        //
        nodes.push({
          id: display_name,
          size: await user.countAnnotations(webpage, startTimestamp, endTimestamp)
        })
        
        // -------------------------------
        
        let interactTo = await user.getInteracts(webpage, startTimestamp, endTimestamp)
        //console.log(interactTo)
        // -------------------------------
        
        Object.keys(interactTo).forEach(target => {
          edges.push({
            source: display_name,
            target: interactTo[target].name,
            size: interactTo[target].count
          })
        })
        
        //return
      } // for (let j = 0; j < users.length; j++) {
      
      socialNetworks.push({
        startTimestamp,
        endTimestamp,
        nodes,
        edges
      })
    } // for (let i = 0; i < timelist.length; i++) {
    
    // ---------------------------------
    // 取得最後一次的node，重新排序
    
    let lastNodes = socialNetworks.slice(-1)[0].nodes
    lastNodes.sort((a, b) => {
      return b.size - a.size
    })
    
    let idToRank = {}
    lastNodes.forEach((node, i) => {
      idToRank[node.id] = i
    })
    
    socialNetworks.slice(0, -1).forEach(sn => {
      sn.nodes.sort((a, b) => {
        return idToRank[a.id] - idToRank[b.id]
      })
    })
    
    // ---------------------------------
    
    return socialNetworks
  }
  
  async calcGroupIndicators (webpage, groupID, dashboardFilterMode) {
    let group = await webpage.getGroup(groupID)
    
    let options = {
      userFilter: dashboardFilterMode
    }
    
    return await group.calcIndicators(options)
  }
  
  async exportGroupData ({request, response, auth}) {
    let { webpageID, groupID } = request.all()
    
    let webpage = await WebpageModel.find(webpageID)
    
    let data = {
      // We will make a Workbook contains 2 Worksheets
      /*
      'animals': [
                  {"name": "cat", "category": "animal"}
                  ,{"name": "dog", "category": "animal"}
                  ,{"name": "pig", "category": "animal"}
                ],
      'pokemons': [
                  {"name": "pikachu", "category": "pokemon"}
                  ,{"name": "Arbok", "category": "pokemon"}
                  ,{"name": "Eevee", "category": "pokemon"}
                ]
      */
    }
    
    // ------------------
    
    let users = await this._getGroupReaderCard(webpage, groupID)
    let socialNetworks = await this.getSocialNetworks(webpage, users)
    
    // ------------------
    data.Members = this._buildSheetGroupMember(users)
    this._buildSheetsSocialNetworks(data, socialNetworks)
    
    data.Annotations = await this._buildSheetAnnotations(webpage, users)
    data.Comments = await this._buildSheetComments(webpage, users)
    
    /*
    data.Questionnaire = await webpage.exportQuestionnaire()
    data.SectionNote = await webpage.exportSectionNote()
    data.Annotation = await webpage.exportAnnotation()
    data.Comment = await webpage.exportComment()
    data.Rate = await webpage.exportRate()
    */
    //console.log(data.Annotation)
    
    let filename = `group_` + webpageID + '_' + groupID + `_${dayjs().format('YYYYMMDD-HHmm')}.ods`
    return SpreadsheetHelper.download(data, filename, response)
  }
  
  _buildSheetGroupMember ( users ) {
    return users.map(user => {
      return {
        id: user.id,
        username: user.username,
        display_name: user.display_name
      }
    })
  } 
  
  _buildSheetsSocialNetworks ( data, socialNetworks ) {
    socialNetworks.forEach( (sn, i) => {  
      let header = 'P' + (i+1) + '_'
      
      if (sn.nodes.length > 0) {
        data[header + 'nodes'] = sn.nodes
      }
      if (sn.edges.length > 0) {
        data[header + 'edges'] = this._buildEdgeArray(sn.nodes, sn.edges)
      }
    })
  }
  
  _buildEdgeArray (nodes, edges) {
    let nodeList = nodes.map(({id}) => id)
    
    // -----------------
    
    let data = {}
    nodeList.forEach(s => {
      data[s] = {}
      nodeList.forEach(t => {
        data[s][t] = 0
      })
    })
    
    
    // --------------
    edges.forEach(({source, target, size}) => {
      data[source][target] = size
    })
    
    // --------------
    
    let lines = []
    
    nodeList.forEach(s => {
      let line = {
        id: s
      }
      
      nodeList.forEach(t => {
        line[t] = data[s][t]
      })
      
      lines.push(line)
    })
    
    return lines
  }
  
  async _buildSheetAnnotations (webpage, users) {
    let annotations = await webpage.exportAnnotation(users.map(u => u.id))
    
    let userNameList = this._parseUserNameList(users)
    
    annotations.forEach(a => {
      let authorID = a.user_id
      a['from_username'] = a.username
      userNameList.forEach(displayName => {
        
        let isMe = (a.username === displayName)
        let value = ''
        if (isMe === true) {
          value = '-'
        }
        a['to_' + displayName] = value
      })
    })
    
    annotations.sort((a, b) => {
      if (a.first_para_id !== b.first_para_id) {
        return a.first_para_id - b.first_para_id
      }
      else if (a.username !== b.username) {
        let nameA = a.username.toLowerCase()
        let nameB = b.username.toLowerCase()
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
    })
    
    return annotations
  }
  
  _parseUserNameList (users) {
    let userNameList = users.map(u => {
      let displayName = u.display_name
      if (!displayName) {
        displayName = u.username
      }
      //displayName = 'to_' + displayName
      return displayName
    })
    userNameList.sort()
    return userNameList
  }
  
  async _buildSheetComments (webpage, users) {
    let comments = await webpage.exportComment(users.map(u => u.id))
    let userNameList = this._parseUserNameList(users)
    
    comments.forEach(c => {
      let authorID = c.user_id
      c['annotator'] = c.annotation_username
      c['commentor'] = c.username
      
      let comment_self = 'false'
      if (c.username === c.annotation_username) {
        comment_self = 'true'
      }
      c['comment_self'] = comment_self
      
      userNameList.forEach(displayName => {
        
        let isMe = (c.username === displayName)
        let value = ''
        if (isMe === true) {
          value = '-'
        }
        c['to_' + displayName] = value
      })
    })
    
    let sortName = (nameA, nameB) => {
      nameA = nameA.toLowerCase()
      nameB = nameB.toLowerCase()
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    }
    
    comments.sort((a, b) => {
      if (a.annotator !== b.annotator) {
        return sortName(a.annotator, b.annotator)
      }
      else if (a.username !== b.username) {
        return sortName(a.username, b.username)
      }
      else {
        return a.comment_id - b.comment_id
      }
    })
    
    return comments
  }
  
}

module.exports = GroupDashboard
