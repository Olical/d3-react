var d3 = require('d3')
var jsdom = require('jsdom')
require('../../')

function render (fn, cb) {
  jsdom.env('', function (errors, window) {
    var el = d3.select(window.document.createElement('div'))
    fn(el)
    cb(el.toReact())
  })
}

module.exports = render
