let HandsontablePluginColumnSortDesc = {
  key: 'column_sort_desc',
  name: function name() {
    return "Sort descend"  // descend 
  },
  callback: function callback(event, coords, th) {
    let index = coords[0].start.col

    let instance = this
    instance.getPlugin('columnSorting').sort({ column: index, sortOrder: 'desc' })
  },
  disabled: function disabled() {
    return false
  },
  hidden: function hidden() {
    return false
  }
}

window.HandsontablePluginColumnSortDesc = HandsontablePluginColumnSortDesc