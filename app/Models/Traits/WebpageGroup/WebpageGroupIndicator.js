'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelepr = use('App/Helpers/StatisticHelper')

class WebpageGroupIndicator {

  register(Model) {
    
    Model.prototype.calcIndicators = async function (options) {
      //return await this.calcIndicatorsAll(options)
      return await this.calcIndicators20200821ExpCtl(options)
    }
    
    Model.prototype._calcIndicatorsGroupInfo = async function (options) {
      
        let users = await this.getUsersDisplayName( (options.userFilter === 'onlyCompleted') ) 
        
        let targetModels = await this.getAttribute('targetModels')
        if (typeof(targetModels) === 'number') {
          targetModels = targetModels + ''
        }
        else if (typeof(targetModels) !== 'string') {
          targetModels = ''
        }
        let groupCode = await this.getAttribute('groupCode')
        
        let output = {
          targetModels: targetModels.split(',').map(m => Number(m)),
          groupCode,
          'users': users.join(' ').trim(),
        }
        
        let attrList = [
          'methodCode', 'cov', 'dv', 
          'read_comp_med', 'read_comp_iqr',
          'attr_med', 'attr_iqr',
          'style_c_med', 'style_c_iqr',
          'style_e_med', 'style_e_iqr',
        ]
        
        for (let i = 0; i < attrList.length; i++) {
          let attr = attrList[i]
          output['a' + i + '_' + attr] = await this.getAttribute(attr)
        }
        
        return output
    }
    
    /**
     * 取得各種指標
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndicatorsAll = async function (options) {
      let cacheKey = Cache.key('calcIndicatorsAll', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let output = await this._calcIndicatorsGroupInfo(options)
        
        // -----------------------
        
        let PeerAsistVector = await this.calcPeerAsistVector(options)
        output.A1_PeerAsistTotal = StatisticHelepr.sum(PeerAsistVector)
        output.A2_PeerAsistMedian = StatisticHelepr.median(PeerAsistVector)
        
        // -------------------
        
        
        let stepNameList = [
          undefined,
          'IndividualReading',
          'CollaborativeReading'
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
          output['B' + (i+1) + 'a_' + indexName + 'AnchorPositionDenseDegree'] = prop
          output['B' + (i+1) + 'b_' + indexName + 'InvertAnchorPositionDenseDegree'] = 1 - prop
          
          for (let j = 0; j < 2; j++) {
            let exportType = exportTypeList[j]
            
            tempOptions.exportType = exportType
            
            let vector = await this.calcAnnotationAnchorPositionOverlapVector(tempOptions)
            
            if (exportType === 'count') {
              output['B' + (i+1) + 'c' + (j+1) +  'a_' + indexName + '_' + exportType + '_AnchorPositionOverlapTotal'] = StatisticHelepr.sum(vector)
            }
            output['B' + (i+1) + 'c' + (j+1) +  'b_' + indexName + '_' + exportType + '_AnchorPositionOverlapMedian'] = StatisticHelepr.median(vector, 4)
            output['B' + (i+1) + 'c' + (j+1) +  'c_' + indexName + '_' + exportType + '_AnchorPositionOverlapAverage'] = StatisticHelepr.average(vector, 4)
          }
        }
        
        
        // -------------------
        
        let InspiredAnnotationVector = await this.calcInspiredAnnotationVector(options)
        output.C1_InspiredAnnotationTotal = StatisticHelepr.sum(InspiredAnnotationVector)
        output.C2_InspiredAnnotationMedian = StatisticHelepr.median(InspiredAnnotationVector)
        
        let InspiredAnnotationPropVector = await this.calcInspiredAnnotationPropVector(options)
        output.C3_InspiredAnnotationPropMedian = StatisticHelepr.median(InspiredAnnotationPropVector, 4)
        
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
        
        let IndividualTokenNoteSimilarityInvertedPropVector = await this.calcIndividualNoteSimilarityInvertedPropVector(options, true)
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
        
        let ActivityVector = await this.calcActivityVector(options)
        output.K1a_ActivityToal = StatisticHelepr.sum(ActivityVector)
        output.K1b_ActivityMedian = StatisticHelepr.median(ActivityVector)
        
        // --------------------
        
        
        let ConfusionVector = await this.calcConfusionVector(options)
        output.L1a_ConfusionTotal = StatisticHelepr.sum(ConfusionVector)
        output.L1b_ConfusionMedian = StatisticHelepr.median(ConfusionVector)
        
        // --------------------
        
        let TotalAnnotationCommentVector = await this.calcTotalAnnotationCommentVector(options)
        output.M1a_TotalAnnotationCommentTotal = StatisticHelepr.sum(TotalAnnotationCommentVector)
        output.M1b_TotalAnnotationCommentMedian = StatisticHelepr.median(TotalAnnotationCommentVector)
        
        
        //let InvertActivityVector = await this.calcInvertActivityVector(options)
        //output.InvertActivityTotal = StatisticHelepr.sum(InvertActivityVector)
        //output.InvertActivityMedian = StatisticHelepr.median(InvertActivityVector)
        
        
        
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
        return output
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * 取得各種指標
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndicators20200820Limited = async function (options) {
      let cacheKey = Cache.key('calcIndicators20200820Limited', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        
        let output = await this._calcIndicatorsGroupInfo(options)
        
        let PeerAsistVector = await this.calcPeerAsistVector(options)
        output.A1_PeerAsistTotal = StatisticHelepr.sum(PeerAsistVector)
        
        let B3c2b_prop_AnchorPositionOverlapVector = await this.calcAnnotationAnchorPositionOverlapVector({
          ...options,
          exportType: 'prop'
        })
        output['B3c2b_prop_AnchorPositionOverlapMedian'] = StatisticHelepr.median(B3c2b_prop_AnchorPositionOverlapVector, 4)
        
        let InspiredAnnotationVector = await this.calcInspiredAnnotationVector(options)
        output.C1_InspiredAnnotationTotal = StatisticHelepr.sum(InspiredAnnotationVector)
        
        let RecallInvertedNonTextbaseIdeasVector = await this.calcRecallInvertedNonTextbaseIdeasVector(options)
        output.D1_RecallInvertedNonTextbaseIdeasTotal = StatisticHelepr.sum(RecallInvertedNonTextbaseIdeasVector)
        
        let ModifyInCollaborationVector = await this.calcModifyInCollaborationVector(options)
        output.E1_ModifyInCollaborationTotal = StatisticHelepr.sum(ModifyInCollaborationVector)
        
        let MonologuesAsistVector = await this.calcMonologuesAsistVector(options)
        output.F2a_MonologuesAsistVectorTotal = StatisticHelepr.sum(MonologuesAsistVector)
        
        let DialogueAsistVector = await this.calcDialogueAsistVector(options)
        output.F3a_DialogueAsistVectorTotal = StatisticHelepr.sum(DialogueAsistVector)
        
        let TotalAnnotationVector = await this.calcTotalAnnotationVector(options)
        output.F4a_TotalAnnotationTotal = StatisticHelepr.sum(TotalAnnotationVector)
        output.F5_SkilledDemonstrationDegree = await this.calcSkilledDemonstrationDegree(options)
        
        output.G1_EvaluationDegree = await this.calcEvaluationDegree(options)
        
        let DialogueCountVector = await this.calcDialogueCountVector(options)
        output.H1a_DialogueCountTotal = StatisticHelepr.sum(DialogueCountVector)
        
        output.H3_GroupTokenNoteSimilarityInvertedDegree = await this.calcGroupNoteSimilarityInvertedDegree(options, true)
        
        return output
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    
    /**
     * 取得實驗組與控制組都可以共用的指標
     * 
     * 實驗組
     * http://pc.pulipuli.info:443/admin#/webpage-dashboard/194/webpage-export
     * 
     * 控制組
     * http://pc.pulipuli.info:443/admin#/webpage-dashboard/197
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndicators20200821ExpCtl = async function (options) {
      let cacheKey = Cache.key('calcIndicators20200821ExpCtl', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let output = await this._calcIndicatorsGroupInfo(options)
        
        // -----------------------
        
//        let PeerAsistVector = await this.calcPeerAsistVector(options)
//        output.A1_PeerAsistTotal = StatisticHelepr.sum(PeerAsistVector)
//        output.A2_PeerAsistMedian = StatisticHelepr.median(PeerAsistVector)
        
        // -------------------
        
        
        let stepNameList = [
          undefined,
          'IndividualReading',
          //'CollaborativeReading'
        ]
        let exportTypeList = [
          'count',
          'prop'
        ]
        
        for (let i = 0; i < stepNameList.length; i++) {
          let stepName = stepNameList[i]
          //console.log(stepName)
          
          let indexName = stepName
          if (!indexName) {
            indexName = ''
          }
          
          let tempOptions = {
                    ...options
          }
          tempOptions.stepName = stepName
          
          let prop = await this.calcAnnotationAnchorPositionDenseDegree(tempOptions)
          output['B' + (i+1) + 'a_' + indexName + 'AnchorPositionDenseDegree'] = prop
          output['B' + (i+1) + 'b_' + indexName + 'InvertAnchorPositionDenseDegree'] = 1 - prop
          
          for (let j = 0; j < 2; j++) {
            let exportType = exportTypeList[j]
            
            tempOptions.exportType = exportType
            
            let vector = await this.calcAnnotationAnchorPositionOverlapVector(tempOptions)
            
            if (exportType === 'count') {
              output['B' + (i+1) + 'c' + (j+1) +  'a_' + indexName + '_' + exportType + '_AnchorPositionOverlapTotal'] = StatisticHelepr.sum(vector)
            }
            output['B' + (i+1) + 'c' + (j+1) +  'b_' + indexName + '_' + exportType + '_AnchorPositionOverlapMedian'] = StatisticHelepr.median(vector, 4)
            output['B' + (i+1) + 'c' + (j+1) +  'c_' + indexName + '_' + exportType + '_AnchorPositionOverlapAverage'] = StatisticHelepr.average(vector, 4)
          }
        }
        
        
        // -------------------
        
//        let InspiredAnnotationVector = await this.calcInspiredAnnotationVector(options)
//        output.C1_InspiredAnnotationTotal = StatisticHelepr.sum(InspiredAnnotationVector)
//        output.C2_InspiredAnnotationMedian = StatisticHelepr.median(InspiredAnnotationVector)
//        
//        let InspiredAnnotationPropVector = await this.calcInspiredAnnotationPropVector(options)
//        output.C3_InspiredAnnotationPropMedian = StatisticHelepr.median(InspiredAnnotationPropVector, 4)
        
        // -------------------
        
        
        let RecallInvertedNonTextbaseIdeasVector = await this.calcRecallInvertedNonTextbaseIdeasVector(options)
        output.D1_RecallInvertedNonTextbaseIdeasTotal = StatisticHelepr.sum(RecallInvertedNonTextbaseIdeasVector)
        output.D2_RecallInvertedNonTextbaseIdeasMedian = StatisticHelepr.median(RecallInvertedNonTextbaseIdeasVector)
        
        let RecallTextbaseIdeasPropVector = await this.calcRecallTextbaseIdeasPropVector(options)
        output.D3_RecallTextbaseIdeasPropMedian = StatisticHelepr.median(RecallTextbaseIdeasPropVector, 4)
        
        output.D4_GroupRecallInvertedNonTextbaseIdeasCount = await this.calcGroupRecallInvertedNonTextbaseIdeasCount(options)
        output.D5_GroupRecallextbaseIdeasProp = await this.calcGroupRecallextbaseIdeasProp(options)
        
        // -------------------
        
//        let ModifyInCollaborationVector = await this.calcModifyInCollaborationVector(options)
//        output.E1_ModifyInCollaborationTotal = StatisticHelepr.sum(ModifyInCollaborationVector)
//        output.E2_ModifyInCollaborationMedian = StatisticHelepr.median(ModifyInCollaborationVector)
        
        // -------------------
        
//        let MonologuesAsistVector = await this.calcMonologuesAsistVector(options)
//        output.F2a_MonologuesAsistVectorTotal = StatisticHelepr.sum(MonologuesAsistVector)
//        output.F2b_MonologuesAsistVectorMedian = StatisticHelepr.median(MonologuesAsistVector)
//        
//        let DialogueAsistVector = await this.calcDialogueAsistVector(options)
//        output.F3a_DialogueAsistVectorTotal = StatisticHelepr.sum(DialogueAsistVector)
//        output.F3b_DialogueAsistVectorMedian = StatisticHelepr.median(DialogueAsistVector)
        
        let TotalAnnotationVector = await this.calcTotalAnnotationVector(options)
        output.F4a_TotalAnnotationTotal = StatisticHelepr.sum(TotalAnnotationVector)
        output.F4b_TotalAnnotationMedian = StatisticHelepr.median(TotalAnnotationVector)
        
        //output.MonologuesDegree = await this.calcMonologuesDegree(options)
        
        output.F5_SkilledDemonstrationDegree = await this.calcSkilledDemonstrationDegree(options)
        
//        let ObserverPeerVector = await this.calcObserverPeerVector(options)
//        output.F6a_ObserverPeerTotal = StatisticHelepr.sum(ObserverPeerVector)
//        output.F6b_ObserverPeerMedian = StatisticHelepr.median(ObserverPeerVector)
        
        // ----------------------------
        
        output.G1_EvaluationDegree = await this.calcEvaluationDegree(options)
        
        // -------------------------
        
        // ----------------------------------------
        
//        let DialogueCountVector = await this.calcDialogueCountVector(options)
//        output.H1a_DialogueCountTotal = StatisticHelepr.sum(DialogueCountVector)
//        output.H1b_DialogueCountMedian = StatisticHelepr.median(DialogueCountVector)
        
        output.H2_GroupNoteSimilarityInvertedDegree = await this.calcGroupNoteSimilarityInvertedDegree(options, false)
        output.H3_GroupTokenNoteSimilarityInvertedDegree = await this.calcGroupNoteSimilarityInvertedDegree(options, true)
        
        // ----
        
        let IndividualNoteSimilarityInvertedPropVector = await this.calcIndividualNoteSimilarityInvertedPropVector(options, false)
        output.H4_IndividualNoteSimilarityInvertedProp = StatisticHelepr.median(IndividualNoteSimilarityInvertedPropVector)
        
        let IndividualNoteSimilarityInvertedCountVector = await this.calcIndividualNoteSimilarityInvertedCountVector(options, false)
        output.H5a_IndividualNoteSimilarityInvertedCountTotal = StatisticHelepr.sum(IndividualNoteSimilarityInvertedCountVector)
        output.H5b_IndividualNoteSimilarityInvertedCountMedian = StatisticHelepr.median(IndividualNoteSimilarityInvertedCountVector)
        
        // ----
        
        let IndividualTokenNoteSimilarityInvertedPropVector = await this.calcIndividualNoteSimilarityInvertedPropVector(options, true)
        output.H6_IndividualTokenNoteSimilarityInvertedProp = StatisticHelepr.median(IndividualTokenNoteSimilarityInvertedPropVector)
        
        let IndividualTokenNoteSimilarityInvertedCountVector = await this.calcIndividualNoteSimilarityInvertedCountVector(options, true)
        output.H7a_IndividualTokenNoteSimilarityInvertedCountTotal = StatisticHelepr.sum(IndividualTokenNoteSimilarityInvertedCountVector)
        output.H7b_IndividualTokenNoteSimilarityInvertedCountMedian = StatisticHelepr.median(IndividualTokenNoteSimilarityInvertedCountVector)
        
        
        // ----------------------------------------
        
        output.I1_ReadingStyleSimilarity = await this.calcReadingStyleSimilarity(options)
        
        // ----------------------------------------
        
//        let ConnectednessDegreeAll = await this.calcConnectednessDegree(options, 'all')
//        output.J1_ConnectednessDegreeAll = ConnectednessDegreeAll
//        //output.InvertConnectednessDegreeAll = 1 - ConnectednessDegreeAll
//        
//        let ConnectednessDegreeFull = await this.calcConnectednessDegree(options, 'full')
//        output.J2_ConnectednessDegreeFull = ConnectednessDegreeFull
//        //output.InvertConnectednessDegreeFull = 1 - ConnectednessDegreeFull
//        
//        
//        let ConnectednessDegreeIn = await this.calcConnectednessDegree(options, 'in')
//        output.J3_ConnectednessDegreeIn = ConnectednessDegreeIn
////        output.InvertConnectednessDegreeIn = 1 - ConnectednessDegreeIn
//        
//        let ConnectednessDegreeOut = await this.calcConnectednessDegree(options, 'out')
//        output.J4_ConnectednessDegreeOut = ConnectednessDegreeOut
//        output.InvertConnectednessDegreeOut = 1 - ConnectednessDegreeOut
        
        // -------------------------
        
        let ActivityVector = await this.calcActivityVector(options)
        output.K1a_ActivityToal = StatisticHelepr.sum(ActivityVector)
        output.K1b_ActivityMedian = StatisticHelepr.median(ActivityVector)
        
        // --------------------
        
        
        let ConfusionVector = await this.calcConfusionVector(options)
        output.L1a_ConfusionTotal = StatisticHelepr.sum(ConfusionVector)
        output.L1b_ConfusionMedian = StatisticHelepr.median(ConfusionVector)
        
        // --------------------
        
        let TotalAnnotationCommentVector = await this.calcTotalAnnotationCommentVector(options)
        output.M1a_TotalAnnotationCommentTotal = StatisticHelepr.sum(TotalAnnotationCommentVector)
        output.M1b_TotalAnnotationCommentMedian = StatisticHelepr.median(TotalAnnotationCommentVector)
        
        
        //let InvertActivityVector = await this.calcInvertActivityVector(options)
        //output.InvertActivityTotal = StatisticHelepr.sum(InvertActivityVector)
        //output.InvertActivityMedian = StatisticHelepr.median(InvertActivityVector)
        
        
        
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
        
        return output
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
  } // register (Model) {
}

module.exports = WebpageGroupIndicator
