let URLHelper = {
  getPathSummary: function (path) {
    if (path.length < 50) {
      return path
    }

    let parts = path.split('/')
    let len = parts.length
    let output = ['']

    if (len === 2) {
      return path
    }
    else if (len < 4) {
      // /../..
      output.push('.../' + parts[(len - 1)])
    }
    else if (len === 4) {
      output.push(parts[1])
      output.push(parts[2].slice(0, 1) + '...' + parts[2].slice(-1, 1))
      output.push(parts[3])
    }
    else {
      output.push(parts[1])
      output.push(parts[2].slice(0, 1) + '...' + parts[(len - 2)].slice(-1))
      output.push(parts[(len - 1)])
    }

    if (output.join('/').length > 50) {
      output = ['']
      if (len < 4) {
        // /../..
        let lastPart = parts[(len - 1)]
        if (lastPart.indexOf('?') > -1) {
          let filename = lastPart.slice(0, lastPart.indexOf('?'))
          let query = lastPart.slice(lastPart.indexOf('?'))

          if (filename > 20) {
            filename = filename.slice(0, 7) + '...' + filename.slice(-7)
          }

          if (query > 20) {
            query = query.slice(0, 20) + '...'
          }

          lastPart = filename + '?' + query
        }
        else if (lastPart.indexOf('#') > -1) {
          let filename = lastPart.slice(0, lastPart.indexOf('#'))
          let query = lastPart.slice(lastPart.indexOf('#'))

          if (filename > 20) {
            filename = filename.slice(0, 7) + '...' + filename.slice(-7)
          }

          if (query > 20) {
            query = query.slice(0, 20) + '...'
          }

          lastPart = filename + '#' + query
        }

        output.push('.../' + parts[(len - 1)])
      }
      else if (len === 4) {
        output.push(parts[1].slice(0, 1) + '...' + parts[2].slice(-1, 1))
        output.push(parts[3])
      }
      else {
        output.push(parts[1].slice(0, 1) + '...' + parts[(len - 2)].slice(-1))
        output.push(parts[(len - 1)])
      }
    }

    return output.join('/')
  }
}

export default URLHelper