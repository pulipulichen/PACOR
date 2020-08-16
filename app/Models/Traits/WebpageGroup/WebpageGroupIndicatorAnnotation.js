'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const AnnotationModel = use('App/Models/Annotation')
const StatisticHelper = use('App/Helpers/StatisticHelper')

const SequenceHelper = use('App/Helpers/SequenceHelper')
const KrippendorffHelper = use('App/Helpers/venders/krippendorff-alpha/KrippendorffHelper')

const AnchorPositionMapHelper = use('App/Helpers/AnchorPositionMapHelper')

class WebpageGroupIndicatorAnnotation {

  register(Model) {
    
    /**
     * 計算問題次數 * -1
     * 最大值是0
     * 最小值-max
     * 
     * 數字越大 (越接近0)，表示該組成員都沒有問題
     * 數字越小 (負數越大)，表示該組成員問題多多
     * 
     * 注意，時間點要是在個人閱讀的階段
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcNoConfusionVector = async function (options) {
      let cacheKey = Cache.key('calcNoConfusionDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName: 'IndividualReading',
            //stepName: 'CollaborativeReading',
            type: ['Confused', 'Clarified']
            //type: ['MainIdea']
          })
          countList.push(c.length * -1)
        }
        
        return countList
        //let startTimestamp = await this.getStartTimestamp(onlyCompleted)
        //let endTimestamp = await this.getEndTimestamp(onlyCompleted)
        //return usersIDList.join(',')
        //return endTimestamp
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/510
     * 額外標註率加總
     * 
     * 在進入協助階段後才開始撰寫的標註比例
     * 如果個人全部標註是10，3個標註是協助階段後才開始撰寫的內容
     * 那可能表示他想要擴大自己原本的知識，受到了啟發
     * 
     * 最小值max
     * 最小值是0
     * 
     * 數字越大，表示該組成員會受到合作影響，改變閱讀的重點或疑問
     * 數字越小，表示該組成員不受合作的影響
     * 
     * 注意，時間點要是在開放同儕協助的階段
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcDeeperAnnotationVector = async function (options) {
      let cacheKey = Cache.key('calcDeeperAnnotationDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: true, // 沒錯，包括刪除，因為我們要算的是他被影響的程度
            //stepName: 'IndividualReading',
            stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/519
     * 整體標註次數
     * 
     * 不論階段
     * 如果標註次數越多
     * 表示這個團體更有機會看到別人的標註
     * 
     * 最小值max
     * 最小值是0
     * 
     * 數字越大，表示這個團體更有機會看到別人的標註
     * 數字越小，表示這個團體更沒機會看到別人的標註
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcTotalAnnotationVector = async function (options) {
      let cacheKey = Cache.key('calcTotalAnnotationVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/520
     * 有能力的示範者程度
     * 
     * 標註數量跟閱讀能力成正比的程度
     * 每組可以計算出一個r值
     * 
     * 數字越大，表示這個團體中，有能力的人示範更多，導致觀察學習的效果提升
     * 數字越小，表示這個團體中，有能力的人跟示範次數無關
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcSkilledDemonstrationDegree = async function (options) {
      let cacheKey = Cache.key('calcSkilledDemonstrationDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let annotationCountList = []
        let readCompList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          try {
            let readComp = user.getAttribute('read_comp')
            readCompList.push(readComp)

            let c = await user.getAnnotationIndicator(webpage, {
              includeDeleted: false,
            })
            annotationCountList.push(c.length)
          }
          catch (e) {}
        }
        
        let r = StatisticHelper.correlationCoefficientR(annotationCountList, readCompList)
        return StatisticHelper.round(r, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/517
     * 單向展示程度 monologues
     * 
     * 如果小組內標註數量差異很大
     * 那表示可能被教者很有機會會看到教人者的示範
     * 因此提高他們的學習成效
     * 
     * 最大值max
     * 最小值是0
     * 
     * 數字越大，表示可能被教者很有機會會看到教人者的示範
     * 數字越小，表示可能被教者沒有機會會看到教人者的示範
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcMonologuesDegree = async function (options) {
      let cacheKey = Cache.key('calcMonologuesDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName: 'IndividualReading',
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          countList.push(c.length)
        }
        
        return StatisticHelper.iqr(countList)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/533
     * 整體表現次數
     * 
     * 標註次數 + 建議次數 + 喜愛
     * 
     * 最大值max
     * 最小值是0
     * 
     * 數字越大，表示
     * 數字越小，表示
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcActivityVector = async function (options) {
      let cacheKey = Cache.key('calcActivityVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let count = 0
          
          let annotations = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false
          })
          count = count + annotations.length
          
          let comments = await user.getCommentIndicator(webpage, {
            includeCommentDeleted: false,
            includeAnnotationDeleted: false,
          })
          count = count + comments.length
          
          let rates = await user.getRateIndicator(webpage, {
            includeRateDeleted: false,
            includeAnchorDeleted: true,
          })
          count = count + rates.length
          
          countList.push(count)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    Model.prototype.calcInvertActivityVector = async function (options) {
      let vector = await this.calcActivityVector(options)
      return vector.map(v => v * -1)
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/528
     * 計算組內閱讀順序的相似性
     * 最大值是1
     * 最小值-max
     * 
     * 數字越大 (越接近0)，表示該組閱讀方式很相似
     * 數字越小 (負數越大)，表示該組閱讀方式差很多
     * 
     * 注意，時間點要是在個人閱讀的階段
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcReadingStyleSimilarity = async function (options) {
      let cacheKey = Cache.key('calcReadingStyleSimilarity', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        /*
        return KrippendorffHelper.calcAlphaByRater([
          [1, 2, 2, 1, 0],
          [0, 1, 2, 1, 0],
        ])
        */
        
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let codes = await webpage.getSeqCodes()
        
        let arrayByRater = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let annotations = await user.getAnnotationIndicator(webpage, {
            includeDeleted: true,
            stepName: 'IndividualReading',
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified']
            //type: ['MainIdea']
            withAnchorPositions: true
          })
          
          
          let seqList = []
          annotations.forEach(annotation => {
            if (Array.isArray(annotation.anchorPositions) === false) {
              return false
            }
            
            annotation.anchorPositions.forEach(anchorPosition => {
              let seq_id = anchorPosition.seq_id
              seqList.push(seq_id)
            })
          })
          
          
          let seqTable = SequenceHelper(seqList, {
            mergeRepeat: false,
            exportMode: 'array',
            //exportMode: 'flat-json',
            codes,
            lag: [1, 2]
            //lag: 2
          })

          //console.log(result)
          //return 1
          arrayByRater.push(seqTable)
          //countList.push(c.length * -1)
        }
        
        //console.log(arrayByRater)
        let alpha = KrippendorffHelper.calcAlphaByRater(arrayByRater, 'interval')
        return StatisticHelper.round(alpha, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/513
     * 個人閱讀時的錨點分散率
     * 
     * 如果小組內錨點分散很大
     * 表示小組內看得地方都不一樣，擁有不同的專業
     * 因此可以提高他們的學習成效
     * 
     * 最大值1
     * 最小值是0
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndividualReadingAnchorPositionDenseDegree = async function (options) {
      let cacheKey = Cache.key('calcIndividualReadingAnchorPositionDenseDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        //usersIDList = usersIDList.slice(0,1)
        //return await _testCalcAnchorPositionDenseDegree()
        
        let annotationsList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let annotations = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName: 'IndividualReading',
            withAnchorPositions: true
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          annotationsList = annotationsList.concat(annotations)
        }
        
        let degree = AnchorPositionMapHelper.calcDenseDegree(annotationsList, usersIDList.length)
        return StatisticHelper.round(degree, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/513
     * 協助閱讀時的錨點分散率
     * 
     * 如果小組內錨點分散很大
     * 表示小組內看得地方都不一樣，擁有不同的專業
     * 因此可以提高他們的學習成效
     * 
     * 最大值1
     * 最小值是0
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcCollaborativeReadingAnchorPositionDenseDegree = async function (options) {
      let cacheKey = Cache.key('calcCollaborativeReadingAnchorPositionDenseDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        //usersIDList = usersIDList.slice(0,1)
        //return await _testCalcAnchorPositionDenseDegree()
        
        let annotationsList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let annotations = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName: 'CollaborativeReading',
            withAnchorPositions: true
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          annotationsList = annotationsList.concat(annotations)
        }
        
        //console.log(annotationsList.length)
        let degree = AnchorPositionMapHelper.calcDenseDegree(annotationsList, usersIDList.length)
        return StatisticHelper.round(degree, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/513
     * 協助閱讀時的錨點分散率
     * 
     * 如果小組內錨點分散很大
     * 表示小組內看得地方都不一樣，擁有不同的專業
     * 因此可以提高他們的學習成效
     * 
     * 最大值1
     * 最小值是0
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcAnnotationAnchorPositionDenseDegree = async function (options) {
      let cacheKey = Cache.key('calcAnnotationAnchorPositionDenseDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        //usersIDList = usersIDList.slice(0,1)
        //return await _testCalcAnchorPositionDenseDegree()
        
        let annotationsList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let annotations = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            //stepName: 'CollaborativeReading',
            withAnchorPositions: true
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          annotationsList = annotationsList.concat(annotations)
        }
        
        //console.log(annotationsList.length)
        let degree = AnchorPositionMapHelper.calcDenseDegree(annotationsList, usersIDList.length)
        return StatisticHelper.round(degree, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
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
    Model.prototype.calcNoteSimilarityDegree = async function (options) {
      let cacheKey = Cache.key('calcNoteDenseDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        if (usersIDList.length < 2) {
          return 0
        }
        
        let charactersBitMap = {}
        
        for (let i = 0; i < usersIDList.length; i++) {
          let userID = usersIDList[i]
          let user = await UserModel.find(usersIDList[i])
          
          let notes = await user.getNoteIndicator(webpage, {
            includeDeleted: false,
          })
          
          notes.forEach(note => {
            note.split('').forEach(char => {
              if (char.trim() === '') {
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
        
        // ------------------------
        let base = usersIDList.length - 1
        let propList = Object.keys(charactersBitMap).map(char => {
          let list = charactersBitMap[char]
          return (list.length - 1) / base
        })
        
        
        //console.log(annotationsList.length)
        let degree = StatisticHelper.average(propList)
        return StatisticHelper.round(degree, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    
    let _testCalcAnchorPositionDenseDegree = async function () {
      let annotations = await AnnotationModel.query()
              .whereIn('id', [4521, 4524, 6187])
              .with('anchorPositions')
              .fetch()
      
      return AnchorPositionMapHelper.calcDenseDegree(annotations)
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorAnnotation
