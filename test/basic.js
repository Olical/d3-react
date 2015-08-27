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

    var children = result._store.props.children
    t.equal(children[1].type, 'p', 'correct tags were added')
    t.equal(children[1].key, '2', 'tags have keys')
  })
})

test('with text', function (t) {
  t.plan(3)
  render(function (el) {
    el.append('p')
      .text('Hello, World!')
      .prop('key', 'some-text')
  }, function (result) {
    var tag = result._store.props.children[0]
    t.equal(tag.type, 'p', 'correct tags were added')
    t.equal(tag.key, 'some-text', 'tags has a key')
    t.equal(tag._store.props.children[0], 'Hello, World!', 'text is correct')
  })
})

test('depth of two', function (t) {
  t.plan(2)
  render(function (el) {
    el.append('p')
      .prop('key', 'one')
      .append('p')
      .prop('key', 'two')
  }, function (result) {
    var one = result._store.props.children[0]
    var two = one._store.props.children[0]

    t.equal(one.key, 'one', 'the first exists')
    t.equal(two.key, 'two', 'the second exists')
  })
})
