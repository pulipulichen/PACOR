'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const AnnotationModel = use('App/Models/Annotation')
const StatisticHelper = use('App/Helpers/StatisticHelper')

const SequenceHelper = use('App/Helpers/SequenceHelper')
const KrippendorffHelper = use('App/Helpers/venders/krippendorff-alpha/KrippendorffHelper')

const AnchorPositionMapHelper = use('App/Helpers/AnchorPositionMapHelper')

class WebpageGroupIndicatorNote {

  register(Model) {
    
    Model.prototype._buildCharactersBitMap = async function (options, useTokenizer = false) {
      let cacheKey = Cache.key('_buildCharactersBitMap', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        if (usersIDList.length < 2) {
          return {}
        }
        
        let charactersBitMap = {}
        
        for (let i = 0; i < usersIDList.length; i++) {
          let userID = usersIDList[i]
          let user = await UserModel.find(usersIDList[i])
          
          let notes = await user.getNoteIndicator(webpage, {
            includeDeleted: false,
            htmlToText: true,
            useTokenizer
          })
          
          notes.forEach(note => {
            let wordList = note
            
            if (Array.isArray(wordList) === false) {
              wordList = wordList.split('')
            }
            
            wordList.forEach(char => {
              //console.log(char)
              char = char.trim()
              
              if (char === '') {
                return false
              }
              
              if (Array.isArray(charactersBitMap[char]) === false) {
                charactersBitMap[char] = []
              }
              
              if (charactersBitMap[char].indexOf(userID) === -1) {
                charactersBitMap[char].push(userID)
              }
            })
          })
        }
        
        return charactersBitMap
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/524
     * 小組觀點獨特率
     * 
     * 如果重疊率很大，表示該組觀點不獨特
     * 
     * 最大值1
     * 最小值是0
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcGroupNoteSimilarityInvertedDegree = async function (options, useTokenizer = false) {
      let cacheKey = Cache.key('calcGroupNoteSimilarityDegree', options, useTokenizer)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let charactersBitMap = await this._buildCharactersBitMap(options, useTokenizer)
        
        // ------------------------
        let base = usersIDList.length - 1
        let propList = Object.keys(charactersBitMap).map(char => {
          let list = charactersBitMap[char]
          return (list.length - 1) / base
        })
        
        
        //console.log(annotationsList.length)
        let degree = StatisticHelper.average(propList)
        degree = 1 - degree
        return StatisticHelper.round(degree, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/524
     * 小組觀點獨特向量
     * 
     * 如果重疊率很大，表示該組觀點不獨特
     * 
     * 最大值1
     * 最小值是0
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndividualNoteSimilarityInvertedPropVector = async function (options, useTokenizer = false) {
      let cacheKey = Cache.key('calcIndividualNoteSimilarityInvertedPropVector', options, useTokenizer)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let charactersBitMap = await this._buildCharactersBitMap(options, useTokenizer)
        //console.log(charactersBitMap)
        // ------------------------
        let vector = usersIDList.map(userID => {
          let list = []
          Object.keys(charactersBitMap).forEach(word => {
            let charUsersList = charactersBitMap[word]
            
            if (charUsersList.indexOf(userID) === -1) {
              return false
            }
            
            if (charUsersList.length > 1) {
              list.push(1)
            }
            else {
              list.push(0)
            }
          })
          //console.log(list)
          if (list.length === 0) {
            return 0
          }
          
          return 1 - StatisticHelper.average(list)
        })
        
        return vector
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/524
     * 小組觀點獨特向量
     * 
     * 如果重疊率很大，表示該組觀點不獨特
     * 
     * 最大值1
     * 最小值是0
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndividualNoteSimilarityInvertedCountVector = async function (options, useTokenizer = false) {
      let cacheKey = Cache.key('calcIndividualNoteSimilarityInvertedCountVector', options, useTokenizer)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let charactersBitMap = await this._buildCharactersBitMap(options, useTokenizer)
        //console.log(charactersBitMap)
        // ------------------------
        let vector = usersIDList.map(userID => {
          let list = []
          Object.keys(charactersBitMap).forEach(word => {
            let charUsersList = charactersBitMap[word]
            
            if (charUsersList.indexOf(userID) === -1) {
              return false
            }
            
            if (charUsersList.length > 1) {
              list.push(1)
            }
            else {
              list.push(0)
            }
          })
          //console.log(list)
          if (list.length === 0) {
            return 0
          }
          
          return StatisticHelper.sum(list) * - 1
        })
        
        return vector
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorNote
