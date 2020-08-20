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
        
        let targetModels = await this.getAttribute('targetModels')
        
        let output = {
          targetModels: targetModels.split(',').map(m => Number(m)),
          'users': users.join(' ').trim()
        }
        
        // -----------------------
        
        let PeerAsistVector = await this.calcPeerAsistVector(options)
        output.A1_PeerAsistTotal = StatisticHelepr.sum(PeerAsistVector)
        output.A2_PeerAsistMedian = StatisticHelepr.median(PeerAsistVector)
        
        // -------------------
        
        
        let stepNameList = [
          'IndividualReading',
          'CollaborativeReading',
          undefined
        ]
        let exportTypeList = [
          'count',
          'prop'
        ]
        
        for (let i = 0; i < 3; i++) {
          let stepName = stepNameList[i]
          
          let indexName = stepName
          if (!indexName) {
            indexName = ''
          }
          
          let tempOptions = {
                    ...options
          }
          tempOptions.stepName = stepName
          
          let prop = await this.calcAnnotationAnchorPositionDenseDegree(tempOptions)
          output['B_' + indexName + 'AnchorPositionDenseDegree'] = prop
          break
          output['B_' + indexName + 'InvertAnchorPositionDenseDegree'] = 1 - prop
          
          for (let j = 0; j < 2; j++) {
            let exportType = exportTypeList[j]
            
            tempOptions.exportType = exportType
            
            let vector = await this.calcAnnotationAnchorPositionOverlapVector(tempOptions)
            
            if (exportType === 'count') {
              output['B_' + indexName + 'AnchorPositionOverlapTotal'] = StatisticHelepr.sum(vector)
            }
            output['B_' + indexName + 'AnchorPositionOverlapMedian'] = StatisticHelepr.median(vector)
            output['B_' + indexName + 'AnchorPositionOverlapAverage'] = StatisticHelepr.average(vector)
          }
        }
        
        
        // -------------------
        
        let InspiredAnnotationVector = await this.calcInspiredAnnotationVector(options)
        output.C1_InspiredAnnotationTotal = StatisticHelepr.sum(InspiredAnnotationVector)
        output.C2_InspiredAnnotationMedian = StatisticHelepr.median(InspiredAnnotationVector)
        
        let InspiredAnnotationPropVector = await this.InspiredAnnotationPropVector(options)
        output.C3_InspiredAnnotationPropMedian = StatisticHelepr.median(InspiredAnnotationVector, 4)
        
        // -------------------
        
        
        let RecallInvertedNonTextbaseIdeasVector = await this.calcRecallInvertedNonTextbaseIdeasVector(options)
        output.D1_RecallInvertedNonTextbaseIdeasTotal = StatisticHelepr.sum(RecallInvertedNonTextbaseIdeasVector)
        output.D2_RecallInvertedNonTextbaseIdeasMedian = StatisticHelepr.median(RecallInvertedNonTextbaseIdeasVector)
        
        let RecallTextbaseIdeasPropVector = await this.calcRecallTextbaseIdeasPropVector(options)
        output.D3_RecallTextbaseIdeasPropMedian = StatisticHelepr.median(RecallTextbaseIdeasPropVector, 4)
        
        output.D4_GroupRecallInvertedNonTextbaseIdeasCount = await this.calcGroupRecallInvertedNonTextbaseIdeasCount(options)
        output.D5_GroupRecallextbaseIdeasProp = await this.calcGroupRecallextbaseIdeasProp(options)
        
        // -------------------
        
        let ModifyInCollaborationVector = await this.calcModifyInCollaborationVector(options)
        output.E1_ModifyInCollaborationTotal = StatisticHelepr.sum(ModifyInCollaborationVector)
        output.E2_ModifyInCollaborationMedian = StatisticHelepr.median(ModifyInCollaborationVector)
        
        // -------------------
        
        let MonologuesAsistVector = await this.calcMonologuesAsistVector(options)
        output.F2a_MonologuesAsistVectorTotal = StatisticHelepr.sum(MonologuesAsistVector)
        output.F2b_MonologuesAsistVectorMedian = StatisticHelepr.median(MonologuesAsistVector)
        
        let DialogueAsistVector = await this.calcDialogueAsistVector(options)
        output.F3a_DialogueAsistVectorTotal = StatisticHelepr.sum(DialogueAsistVector)
        output.F3b_DialogueAsistVectorMedian = StatisticHelepr.median(DialogueAsistVector)
        
        let TotalAnnotationVector = await this.calcTotalAnnotationVector(options)
        output.F4a_TotalAnnotationTotal = StatisticHelepr.sum(TotalAnnotationVector)
        output.F4b_TotalAnnotationMedian = StatisticHelepr.median(TotalAnnotationVector)
        
        //output.MonologuesDegree = await this.calcMonologuesDegree(options)
        
        output.F5_SkilledDemonstrationDegree = await this.calcSkilledDemonstrationDegree(options)
        
        let ObserverPeerVector = await this.calcObserverPeerVector(options)
        output.F6a_ObserverPeerTotal = StatisticHelepr.sum(ObserverPeerVector)
        output.F6b_ObserverPeerMedian = StatisticHelepr.median(ObserverPeerVector)
        
        // ----------------------------
        
        output.G1_EvaluationDegree = await this.calcEvaluationDegree(options)
        
        // -------------------------
        
        // ----------------------------------------
        
        let DialogueCountVector = await this.calcDialogueCountVector(options)
        output.H1a_DialogueCountTotal = StatisticHelepr.sum(DialogueCountVector)
        output.H1b_DialogueCountMedian = StatisticHelepr.median(DialogueCountVector)
        
        output.H2_GroupNoteSimilarityInvertedDegree = await this.calcGroupNoteSimilarityInvertedDegree(options, false)
        output.H3_GroupTokenNoteSimilarityInvertedDegree = await this.calcGroupNoteSimilarityInvertedDegree(options, true)
        
        // ----
        
        let IndividualNoteSimilarityInvertedPropVector = await this.calcIndividualNoteSimilarityInvertedPropVector(options, false)
        output.H4_IndividualNoteSimilarityInvertedProp = StatisticHelepr.median(IndividualNoteSimilarityInvertedPropVector)
        
        let IndividualNoteSimilarityInvertedCountVector = await this.calcIndividualNoteSimilarityInvertedCountVector(options, false)
        output.H5a_IndividualNoteSimilarityInvertedCountTotal = StatisticHelepr.sum(IndividualNoteSimilarityInvertedCountVector)
        output.H5b_IndividualNoteSimilarityInvertedCountMedian = StatisticHelepr.median(IndividualNoteSimilarityInvertedCountVector)
        
        // ----
        
        let IndividualTokenNoteSimilarityInvertedPropVector = await this.calcIndividualNoteSimilarityPropInvertedVector(options, true)
        output.H6_IndividualTokenNoteSimilarityInvertedProp = StatisticHelepr.median(IndividualTokenNoteSimilarityInvertedPropVector)
        
        let IndividualTokenNoteSimilarityInvertedCountVector = await this.calcIndividualNoteSimilarityInvertedCountVector(options, true)
        output.H7a_IndividualTokenNoteSimilarityInvertedCountTotal = StatisticHelepr.sum(IndividualTokenNoteSimilarityInvertedCountVector)
        output.H7b_IndividualTokenNoteSimilarityInvertedCountMedian = StatisticHelepr.median(IndividualTokenNoteSimilarityInvertedCountVector)
        
        
        // ----------------------------------------
        
        output.I1_ReadingStyleSimilarity = await this.calcReadingStyleSimilarity(options)
        
        // ----------------------------------------
        
        let ConnectednessDegreeAll = await this.calcConnectednessDegree(options, 'all')
        output.J1_ConnectednessDegreeAll = ConnectednessDegreeAll
        //output.InvertConnectednessDegreeAll = 1 - ConnectednessDegreeAll
        
        let ConnectednessDegreeFull = await this.calcConnectednessDegree(options, 'full')
        output.J2_ConnectednessDegreeFull = ConnectednessDegreeFull
        //output.InvertConnectednessDegreeFull = 1 - ConnectednessDegreeFull
        
        
        let ConnectednessDegreeIn = await this.calcConnectednessDegree(options, 'in')
        output.J3_ConnectednessDegreeIn = ConnectednessDegreeIn
//        output.InvertConnectednessDegreeIn = 1 - ConnectednessDegreeIn
        
        let ConnectednessDegreeOut = await this.calcConnectednessDegree(options, 'out')
        output.J4_ConnectednessDegreeOut = ConnectednessDegreeOut
//        output.InvertConnectednessDegreeOut = 1 - ConnectednessDegreeOut
        
        // -------------------------
        
        let InvertActivityVector = await this.calcInvertActivityVector(options)
        output.InvertActivityTotal = StatisticHelepr.sum(InvertActivityVector)
        output.InvertActivityMedian = StatisticHelepr.median(InvertActivityVector)
        
        let ActivityVector = await this.calcActivityVector(options)
        output.ActivityMedian = StatisticHelepr.median(ActivityVector)
        
//        output.GroupRecallNewIdeaProp = await this.calcGroupRecallNewIdeaProp(options)
//        output.GroupRecallNewIdeaCount = await this.calcGroupRecallNewIdeaCount(options)
//        output.GroupRecallLessIdeaCount = await this.calcGroupRecallLessIdeaCount(options)
//        
//        
//        let UserRecallNewIdeaVector = await this.calcUserRecallNewIdeaVector(options)
//        output.UserRecallNewIdeaVectorTotal = StatisticHelepr.sum(UserRecallNewIdeaVector)
//        output.UserRecallNewIdeaVectorMedian = StatisticHelepr.median(UserRecallNewIdeaVector)
//        
//        let UserRecallLessIdeaVector = await this.calcUserRecallLessIdeaVector(options)
//        output.UserRecallLessIdeaTotal = StatisticHelepr.sum(UserRecallLessIdeaVector)
//        output.UserRecallLessIdeaMedian = StatisticHelepr.median(UserRecallLessIdeaVector)
        
        
        let NoConfusionVector = await this.calcNoConfusionVector(options)
        output.NoConfusionTotal = StatisticHelepr.sum(NoConfusionVector)
        output.NoConfusionMedian = StatisticHelepr.median(NoConfusionVector)
        
        
        return output
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicator
