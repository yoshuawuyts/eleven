var mapLimit = require('map-limit')
var path = require('path')
var fs = require('fs')

var alice = fs.readFileSync(path.join(__dirname, '../assets/11.txt'), 'utf8')

module.exports = function (state, emitter) {
  state.read = {
    index: 0
  }

  emitter.on('DOMContentLoaded', () => {
    var local = window.localStorage.index
    state.read.index = local ? JSON.parse(local) : 0

    emitter.on('notification:granted', () => {
      var arr = alice.split('\n')
      emitter.emit('log:info', `index is ${state.read.index}`)
      arr.splice(0, state.read.index)
      mapLimit(arr, 1, iterate, () => console.log('done!'))

      function iterate (text, done) {
        setState()
        if (!text) return done()
        emitter.emit('notification:new', text)

        setTimeout(function () {
          done()
        }, 3000)
      }
    })

    setTimeout(() => {
      emitter.emit('notification:request')
    }, 3000)
  })

  function setState () {
    state.read.index += 1
    window.localStorage.index = state.read.index
  }
}
