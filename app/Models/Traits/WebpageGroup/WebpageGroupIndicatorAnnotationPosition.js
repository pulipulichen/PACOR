'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const AnnotationModel = use('App/Models/Annotation')
const StatisticHelper = use('App/Helpers/StatisticHelper')

const SequenceHelper = use('App/Helpers/SequenceHelper')
const KrippendorffHelper = use('App/Helpers/venders/krippendorff-alpha/KrippendorffHelper')

const AnchorPositionMapHelper = use('App/Helpers/AnchorPositionMapHelper')

class WebpageGroupIndicatorAnnotationPosition {

  register(Model) {
    
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
        let tempOptions = {
                  ...options
        }
        tempOptions.stepName = 'IndividualReading'
        return await this.calcAnnotationAnchorPositionDenseDegree(tempOptions)
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
        let tempOptions = {
                  ...options
        }
        tempOptions.stepName = 'CollaborativeReading'
        return await this.calcAnnotationAnchorPositionDenseDegree(tempOptions)
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
        //return await _testCalcAnchorPositionOverlapVector()
        
        let webpage = await this.webpage().fetch()
        
        let {stepName} = options
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        //usersIDList = usersIDList.slice(0,1)
        //return await _testCalcAnchorPositionDenseDegree()
        
        let annotationsList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let annotations = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName,
            //stepName: 'CollaborativeReading',
            withAnchorPositions: true
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          
          annotationsList = annotationsList.concat(annotations)
        }
        
        //console.log(annotationsList.length)
        let degree = AnchorPositionMapHelper.calcDenseDegree(annotationsList, usersIDList)
        return StatisticHelper.round(degree, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/535
     * 計算重疊的個人資料
     * 
     * 如果小組內錨點分散很大
     * 表示小組內看得地方都不一樣，擁有不同的專業
     * 因此可以提高他們的學習成效
     * 
     * 最大值1
     * 最小值是0
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all',
     *   exportType: 'count' 單純看字數 || 'prop' 看有跟人重疊的比例
     * }
     * @returns {Number}
     */
    Model.prototype.calcAnnotationAnchorPositionOverlapVector = async function (options) {
      let cacheKey = Cache.key('calcAnnotationAnchorPositionOverlapVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let {stepName, exportType} = options
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        //usersIDList = usersIDList.slice(0,1)
        //return await _testCalcAnchorPositionDenseDegree()
        
        let annotationsList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let annotations = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName,
            //stepName: 'CollaborativeReading',
            withAnchorPositions: true
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          annotationsList = annotationsList.concat(annotations)
        }
        
        //console.log(annotationsList.length)
        return AnchorPositionMapHelper.calcOverlapVector(annotationsList, usersIDList, exportType)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcMonologuesDegree = async function (options) {
    
    let _testCalcAnchorPositionDenseDegree = async function () {
      // 4521 跟 4524 是同一個位置， 光學顯微鏡，不同的兩個人
      // 6187 是不同位置：放大鏡 user 631
      
      // 2 2 2 2 2 1 1 1
      // 光學顯微鏡放大鏡 = (0.5 * 5) / 8
      
      let annotations = await AnnotationModel.query()
              .whereIn('id', [4521, 4524, 6187])
              .with('anchorPositions')
              .fetch()
      
      return AnchorPositionMapHelper.calcDenseDegree(annotations)
    }
    
    let _testCalcAnchorPositionOverlapVector = async function () {
      // 4521 跟 4524 是同一個位置， 光學顯微鏡，不同的兩個人
      // 6187 是不同位置：放大鏡 user 631
      
      // 2 2 2 2 2 1 1 1
      // 光學顯微鏡放大鏡 = (0.5 * 5) / 8
      
      let annotations = await AnnotationModel.query()
              .whereIn('id', [4521, 4524, 6187])
              .with('anchorPositions')
              .fetch()
      
      
      let vector =  AnchorPositionMapHelper.calcOverlapVector(annotations, null, 'prop')
      console.log(vector)
      return StatisticHelper.average(vector)
    }
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorAnnotationPosition
