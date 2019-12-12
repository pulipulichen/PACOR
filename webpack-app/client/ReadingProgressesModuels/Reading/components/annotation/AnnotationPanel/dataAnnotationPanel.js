export default {
  
  panelData: {
    anchorPositions: null,
    annotation: null,
    isAnnotationEditing: false,
    
    filter: {
      user: null,
      type: null,
    },
    hooks: {
      cancel: null,
      add: null,
      update: null,
      delete: null
    },
    focusCommentID: null,
    
    keyword: '',
    
    heightPX: 500,  // 記錄目前使用的高度，不可省略
  },
  
  
  
  isHide: true, // 好像跟動畫捲動有關係，目前不能省略
  placeholder: null,
  resizeLocker: false,
  
  events: {}
}