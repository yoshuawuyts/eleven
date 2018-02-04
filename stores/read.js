var mapLimit = require('map-limit')
var path = require('path')
var fs = require('fs')

var alice = fs.readFileSync(path.join(__dirname, '../assets/11.txt'), 'utf8')

module.exports = function (state, emitter) {
  emitter.on('DOMContentLoaded', () => {
    emitter.on('notification:granted', () => {
      var arr = alice.split('\n')
      mapLimit(arr, 1, iterate, done)

      function iterate (text, done) {
        if (!text) return done()
        emitter.emit('notification:new', text)

        setTimeout(function () {
          done()
        }, 3000)
      }

      function done () {
        console.log('done!')
      }
    })

    setTimeout(() => {
      emitter.emit('notification:request')
    }, 3000)
  })
}
