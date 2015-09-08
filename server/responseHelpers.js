var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type' : "application/json"
};

var buildData = function(request, callback) {
  var fullBody = '';

  request.on('data', function(chunk) {
    fullBody += chunk;
  });

  request.on('end', function() {
    callback(JSON.parse(fullBody));
  });
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
}

module.exports.headers = headers;
module.exports.buildData = buildData;
module.exports.sendResponse = sendResponse;