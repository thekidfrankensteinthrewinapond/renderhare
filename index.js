const assetExtensions = require('./extensions.js');
const fullUrl = require('full-url');
const got = require('got');

module.exports = function(cfg = {}){
  if(!cfg.token) {
    throw new Error('{token} configuration is required.')
  }

  let copy = Object.assign(Object.create(null), cfg);
  return render.bind(null, copy);
};

function render(config, request, response, next){
  let {token: apiToken, bypass} = config;

  if(bypass) {
    return next();
  }

  let skip = false;

  let isRenderHare = request.query._renderhare_ ||
    /HeadlessChrome/.test(request.get('user-agent'));
  if(isRenderHare) {
    return next();
  }

  let host = request.get('host');
  skip = ['localhost', '127.0.0.1'].some(h => host.includes(h));

  if(skip) {
    return next();
  }

  let lowerUrl = request.url.toLowerCase();
  skip = assetExtensions.some(ext => lowerUrl.includes(ext));

  if(skip) {
    return next();
  }

  let renderUrl = `http://run.renderhare.com/${fullUrl(request)}`;

  let stream = got.stream(renderUrl, {
    headers: {
      'API-Token': apiToken,
      'Cookie': request.headers.cookie
    }
  });

  stream.on('response', res => {
    let {statusCode, headers} = res;

    response.writeHead(statusCode, headers);
    stream.pipe(response);
  });

  stream.on('error', next);
}
