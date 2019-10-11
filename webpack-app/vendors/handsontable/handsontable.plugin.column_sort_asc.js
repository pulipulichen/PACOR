let HandsontablePluginColumnSortAsc = {
  key: 'column_sort_asc',
  name: function name() {
    return "Sort ascend"  // descend 
  },
  callback: function callback(event, coords, th) {
    let index = coords[0].start.col

    let instance = this
    instance.getPlugin('columnSorting').sort({ column: index, sortOrder: 'asc' })
  },
  disabled: function disabled() {
    return false
  },
  hidden: function hidden() {
    return false
  }
}

window.HandsontablePluginColumnSortAsc = HandsontablePluginColumnSortAsc