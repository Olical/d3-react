var test = require('tape')
var render = require('./utils/render')

test('empty', function (t) {
  t.plan(1)
  render(function () {}, function (result) {
    t.equal(result.type, 'div', 'it built a div')
  })
})

test('with children', function (t) {
  t.plan(3)
  render(function (el) {
    el.selectAll('p')
      .data([1, 2, 3])
      .enter()
      .append('p')
      .prop('key', function (d) { return d })
  }, function (result) {
    t.equal(result.type, 'div', 'it built a div')
    t.equal(result._store.props.children[1].type, 'p', 'correct tags were added')
    t.equal(result._store.props.children[1].key, '2', 'tags have keys')
  })
})

