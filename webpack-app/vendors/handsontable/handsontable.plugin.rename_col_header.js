let HandsontablePluginRenameColHeader = {
  key: 'rename_col_header',
  name: function name() {
    return "Rename column header"
  },
  callback: function callback(event, coords, th) {
    //this.alter('remove_col', (0, _utils2.transformSelectionToColumnDistance)(this.getSelected()), null, 'ContextMenu.removeColumn');
    //alert('ok')
    //console.log([event, coords, th])

    let index = coords[0].start.col

    let instance = this
    let headers = instance.getColHeader()

    //console.log(headers)

    //headers[index] = 
    let header = headers[index]
    
    //let newHeader = window.prompt('Rename column header', header)
    window.top.ElectronHelper.prompt('Rename column header', header, (newHeader) => {
      if (typeof(newHeader) !== 'string' || newHeader.trim() === '') {
        return this
      }

      headers[index] = newHeader

      //console.log(headers)

      //console.log(instance.getColHeader())
      instance.updateSettings({
        modifyColWidth: () => {},
        colHeaders: headers
      })

      autoColumnSize = this.getPlugin('autoColumnSize');
      autoColumnSize.calculateAllColumnsWidth()
    })
  },
  disabled: function disabled() {
    /*
     var selected = (0, _utils.getValidSelection)(this);
     var totalColumns = this.countCols();
     
     if (!selected) {
     return true;
     }
     
     return this.selection.isSelectedByRowHeader() || this.selection.isSelectedByCorner() || !this.isColumnModificationAllowed() || !totalColumns;
     */
    return false
  },
  hidden: function hidden() {
    //return !this.getSettings().allowRemoveColumn;
    return false
  }
}

window.HandsontablePluginRenameColHeader = HandsontablePluginRenameColHeader