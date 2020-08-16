'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelepr = use('App/Helpers/StatisticHelper')

class WebpageGroupIndicator {

  register(Model) {
    
    /**
     * 取得各種指標
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndicators = async function (options) {
      let cacheKey = Cache.key('calcIndicators', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let users = await this.getUsersDisplayName( (options.userFilter === 'onlyCompleted') ) 
        
        let output = {
          'users': users.join(' ')
        }
        
        let NoConfusionVector = await this.calcNoConfusionVector(options)
        output.NoConfusionTotal = StatisticHelepr.sum(NoConfusionVector)
        output.NoConfusionMedian = StatisticHelepr.median(NoConfusionVector)
        
        let PeerAsistVector = await this.calcPeerAsistVector(options)
        output.PeerAsistTotal = StatisticHelepr.sum(PeerAsistVector)
        output.PeerAsistMedian = StatisticHelepr.median(PeerAsistVector)
        
        let DeeperAnnotationVector = await this.calcDeeperAnnotationVector(options)
        output.DeeperAnnotationTotal = StatisticHelepr.sum(DeeperAnnotationVector)
        output.DeeperAnnotationMedian = StatisticHelepr.median(DeeperAnnotationVector)
        
        let TotalAnnotationVector = await this.calcTotalAnnotationVector(options)
        output.TotalAnnotationTotal = StatisticHelepr.sum(TotalAnnotationVector)
        output.TotalAnnotationMedian = StatisticHelepr.median(TotalAnnotationVector)
        
        output.MonologuesDegree = await this.calcMonologuesDegree(options)
        output.EvaluationDegree = await this.calcEvaluationDegree(options)
        output.SkilledDemonstrationDegree = await this.calcSkilledDemonstrationDegree(options)
        
        let ModifyInCollaborationVector = await this.calcModifyInCollaborationVector(options)
        output.ModifyInCollaborationTotal = StatisticHelepr.sum(ModifyInCollaborationVector)
        output.ModifyInCollaborationMedian = StatisticHelepr.median(ModifyInCollaborationVector)
        
        let ObserverPeerVector = await this.calcObserverPeerVector(options)
        output.ObserverPeerTotal = StatisticHelepr.sum(ObserverPeerVector)
        output.ObserverPeerMedian = StatisticHelepr.median(ObserverPeerVector)
        
        let InvertActivityVector = await this.calcInvertActivityVector(options)
        output.InvertActivityTotal = StatisticHelepr.sum(InvertActivityVector)
        output.InvertActivityMedian = StatisticHelepr.median(InvertActivityVector)
        
        let ActivityVector = await this.calcActivityVector(options)
        output.ActivityMedian = StatisticHelepr.median(ActivityVector)
        
        output.ReadingStyleSimilarity = await this.calcReadingStyleSimilarity(options)
        
        let IndividualReadingAnchorPositionDenseDegree = await this.calcIndividualReadingAnchorPositionDenseDegree(options)
        output.IndividualReadingAnchorPositionDenseDegree = IndividualReadingAnchorPositionDenseDegree
        output.InvertIndividualReadingAnchorPositionDenseDegree = 1 - IndividualReadingAnchorPositionDenseDegree
        
        let CollaborativeReadingAnchorPositionDenseDegree = await this.calcCollaborativeReadingAnchorPositionDenseDegree(options)
        output.CollaborativeReadingAnchorPositionDenseDegree = CollaborativeReadingAnchorPositionDenseDegree
        output.InvertCollaborativeReadingAnchorPositionDenseDegree = 1 - CollaborativeReadingAnchorPositionDenseDegree
        
        let AnnotationAnchorPositionDenseDegree = await this.calcAnnotationAnchorPositionDenseDegree(options)
        output.AnnotationAnchorPositionDenseDegree = AnnotationAnchorPositionDenseDegree
        output.InvertAnnotationAnchorPositionDenseDegree = 1 - AnnotationAnchorPositionDenseDegree
        
        let ConnectednessDegreeAll = await this.calcConnectednessDegree(options, 'all')
        output.ConnectednessDegreeAll = ConnectednessDegreeAll
        output.InvertConnectednessDegreeAll = 1 - ConnectednessDegreeAll
        
        let ConnectednessDegreeFull = await this.calcConnectednessDegree(options, 'full')
        output.ConnectednessDegreeFull = ConnectednessDegreeFull
        output.InvertConnectednessDegreeFull = 1 - ConnectednessDegreeFull
        
        let ConnectednessDegreeIn = await this.calcConnectednessDegree(options, 'in')
        output.ConnectednessDegreeIn = ConnectednessDegreeIn
        output.InvertConnectednessDegreeIn = 1 - ConnectednessDegreeIn
        
        let ConnectednessDegreeOut = await this.calcConnectednessDegree(options, 'out')
        output.ConnectednessDegreeOut = ConnectednessDegreeOut
        output.InvertConnectednessDegreeOut = 1 - ConnectednessDegreeOut
        
        output.GroupRecallNewIdeaProp = await this.calcGroupRecallNewIdeaProp(options)
        output.GroupRecallNewIdeaCount = await this.calcGroupRecallNewIdeaCount(options)
        output.GroupRecallLessIdeaCount = await this.calcGroupRecallLessIdeaCount(options)
        
        let UserRecallNewIdeaVector = await this.calcUserRecallNewIdeaVector(options)
        output.UserRecallNewIdeaVectorTotal = StatisticHelepr.sum(UserRecallNewIdeaVector)
        output.UserRecallNewIdeaVectorMedian = StatisticHelepr.median(UserRecallNewIdeaVector)
        
        let UserRecallLessIdeaVector = await this.calcUserRecallLessIdeaVector(options)
        output.UserRecallLessIdeaTotal = StatisticHelepr.sum(UserRecallLessIdeaVector)
        output.UserRecallLessIdeaMedian = StatisticHelepr.median(UserRecallLessIdeaVector)
        
        output.calcNoteSimilarityDegree = await this.calcNoteSimilarityDegree(options)
        
        let DialogueVector = await this.calcDialogueVector(options)
        output.DialogueVectorTotal = StatisticHelepr.sum(DialogueVector)
        output.DialogueVectorMedian = StatisticHelepr.median(DialogueVector)
        
       
        return output
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicator
