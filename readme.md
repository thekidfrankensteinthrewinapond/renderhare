# renderhare

Express / Connect middleware for server-side rendering with [RenderHare](https://renderhare.com/).

## Install

Available [on npm](https://www.npmjs.com/package/renderhare):

```shell
npm install renderhare --save
```

Or using [yarn](https://yarnpkg.com/en/):

```shell
yarn add renderhare
```

## Use

This package can be used as Express middleware like so:

```js
const renderhare = require('renderhare');
const app = require('express')();

// A lot of other important stuff

app.use(renderhare({
  token: 'YOUR TOKEN HERE'
}));

app.listen(8080);
```

## Options

The following options are provided, only `token` is required:

### token

Your API __token__, which you can [find here](https://renderhare.com/docs). A token is required to render with RenderHare.

### bypass

A boolean, if true __bypass__ signals to not use RenderHare. You might use this in a development or testing environment.

```js
app.use(renderhare({
  token: 'YOUR TOKEN HERE',
  bypass: process.env.NODE_ENV === 'testing'
}))
```

## License

MIT
