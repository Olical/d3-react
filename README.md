# d3-react [![npm version](https://badge.fury.io/js/d3-react.svg)](http://badge.fury.io/js/d3-react) [![Build Status](https://travis-ci.org/Olical/d3-react.svg?branch=master)](https://travis-ci.org/Olical/d3-react) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# WARNING: Depreciated in favour of [react-faux-dom][], my other (better) approach to using D3 with React.

Render [React][] elements with [D3][] declaratively and without state, as it should be.

## Usage

This plugin essentially allows you to use D3 as your React render function without letting D3 mutate any existing DOM. You build the entire result from scratch on each render and then let React reconcile the DOM / SVG. Here's a simple chart built with the plugin.

```javascript
var Graph = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.number)
  },
  render: function () {
    var chart = d3.select(document.createElement('div'))

    chart
      .selectAll('.bar')
      .data(this.props.data)
      .enter().append('div')
      .prop({
        className: 'bar',
        key: function (d, i) {
          return i
        },
        style: function (d, i) {
          return {
            width: d * 10
          }
        }
      })
      .text(function (d) {
        return d
      })

    return chart.toReact()
  }
})

var data = [4, 8, 15, 16, 23, 42]

React.render(
  React.createElement(Graph, {data: data}),
  document.getElementById('mount-chart')
)
```

As you can see, I'm using `prop` in place of `attr` and `toReact` at the end to build the React DOM. I'm also specifying a key so React knows which element is which. `prop` works just like `attr` so you can give it an object, key/value or key/function.

This script depends upon D3 and React, so make sure they're available within your application. It's wrapped in a [UMD][], so you should be able to use it with most module systems. You may need to configure your build tool to not include multiple versions of React and D3 in your final script bundle.

## Why?

This was born from trying to use these two excellent tools together, but not liking how the existing bridges were executed ([react-d3-wrap][], for example). The wrap approach works, but I'd much rather declare my view and let React work out what to render.

This repository is a polished version of my [experiment][d3-lab]. The main drawback is that you can't use some normal D3 features, such as animations or anything else that mutates the DOM after it's rendered. You can however now write modular React components and animate the elements they produce. It's a trade off, you're sacrificing parts of D3 for simplicity and a more React-like approach.

The main driving factor was to make building great React / D3 things at [Qubit][] easier. Qubit is awesome.

## Development

```bash
# Fetch the dependencies
make bootstrap

# Test
make test

# Test continually
make test-watch
```

## Author

[Oliver Caldwell][author-site] ([@OliverCaldwell][author-twitter])

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[unlicense]: http://unlicense.org/
[author-site]: http://oli.me.uk/
[author-twitter]: https://twitter.com/OliverCaldwell
[d3]: http://d3js.org/
[react]: http://facebook.github.io/react/
[d3-lab]: http://lab.oli.me.uk/d3-to-react/
[react-d3-wrap]: https://www.npmjs.com/package/react-d3-wrap
[qubit]: http://www.qubit.com/
[umd]: https://github.com/umdjs/umd
[react-faux-dom]: https://github.com/Olical/react-faux-dom
