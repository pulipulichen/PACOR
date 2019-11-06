'use strict'

class AnnotationAnchorPositions {

  register(Model) {
    Model._buildAnchorPositionWhere = function (builder, anchorMode, anchorPositions) {

      anchorPositions = this._filterAnchorPositions(anchorPositions)

      let whereQuery
      switch (anchorMode) {
        case 'include':
          whereQuery = this._buildAnchorPositionWhereInclude(anchorPositions)
          break
        case 'exact':
          whereQuery = this._buildAnchorPositionWhereExact(anchorPositions)
          break
        case 'overlap':
          whereQuery = this._buildAnchorPositionWhereOverlap(anchorPositions)
          break
        default:
          whereQuery = this._buildAnchorPositionWhereOverlap(anchorPositions)
      }

      //console.log(whereQuery.whereSQL, whereQuery.bindValues)

      builder.whereRaw(whereQuery.whereSQL, whereQuery.bindValues)
    }

    Model._filterAnchorPositions = function (anchorPositions) {
      return anchorPositions.map(position => {
        //if (position === undefined) {
        //  console.trace('_filterAnchorPositions', position)
        //}
        let start_pos = position.start_pos

        if (typeof (start_pos) === 'string') {
          start_pos = parseInt(start_pos, 10)
        }

        let end_pos = position.end_pos
        if (typeof (end_pos) === 'string') {
          end_pos = parseInt(end_pos, 10)
        }

        if (start_pos > end_pos) {
          let tmp = start_pos
          start_pos = end_pos
          end_pos = tmp
        }

        position.start_pos = start_pos
        position.end_pos = end_pos
        //console.log('position', position)

        return position
      })
    }

    Model._buildAnchorPositionWhereInclude = function (anchorPositions) {
      let whereAnd = []
      let bindValues = []

      anchorPositions.forEach(position => {
        whereAnd.push('(paragraph_id = ? and start_pos >= ? and end_pos <= ?)')
        //console.log(position.end_pos, typeof(position.end_pos))

        bindValues = bindValues.concat([
          position.paragraph_id,
          position.start_pos,
          position.end_pos
        ])
      })

      let whereSQL = whereAnd.join(' and ')
      if (whereAnd.length > 1) {
        whereSQL = `(${whereSQL})`
      }

      return {
        whereSQL: whereSQL,
        bindValues: bindValues
      }
      //console.log(whereOrSQL)
      //console.log(bindValues)
    }

    Model._buildAnchorPositionWhereExact = function (anchorPositions) {
      let whereAnd = []
      let bindValues = []

      anchorPositions.forEach(position => {
        whereAnd.push('(paragraph_id = ? and start_pos = ? and end_pos = ?)')
        //console.log(position.end_pos, typeof(position.end_pos))

        bindValues = bindValues.concat([
          position.paragraph_id,
          position.start_pos,
          position.end_pos
        ])
      })

      return {
        whereSQL: '(' + whereAnd.join(' and ') + ')',
        bindValues: bindValues
      }
    }



    Model._buildAnchorPositionWhereOverlap = function (anchorPositions) {
      let where = []
      let bindValues = []

      //console.log(anchorPositions)
      anchorPositions.forEach(position => {
        //console.log(position)
        where.push(`(paragraph_id = ? and `
                + `((start_pos >= ? and start_pos <= ?) or (end_pos >= ? and end_pos <= ?)))`)
        bindValues = bindValues.concat([
          position.paragraph_id,
          position.start_pos,
          position.end_pos,
          position.start_pos,
          position.end_pos
        ])
      })

      let whereSQL = where.join(' or ')
      if (where.length > 1) {
        whereSQL = '(' + whereSQL + ')'
      }

      //console.log(whereSQL)
      //console.log(bindValues)
      //whereSQL = ''
      //bindValues = []

      return {
        whereSQL: whereSQL,
        bindValues: bindValues
      }
    }
  } // register (Model) {
}

module.exports = AnnotationAnchorPositions
