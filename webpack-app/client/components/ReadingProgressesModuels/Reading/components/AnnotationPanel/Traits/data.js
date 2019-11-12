export default {
  
  panelData: {
    query: {
      anchorPositions: null,
      keyword: ''
    },
    annotation: null,
    
    filter: {
      user: null,
      type: null,
    },
    hooks: null,
    
    heightPX: 500,  // 記錄目前使用的高度，不可省略
  },
  
  
  
  isHide: true, // 好像跟動畫捲動有關係，目前不能省略
  placeholder: null,
  resizeLocker: false,
  
  events: {}
}