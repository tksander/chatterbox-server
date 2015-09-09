/* Import node's http module: */
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var requests = require("./request-handler.js");
var helpers = require("./responseHelpers.js");

var basePath = __dirname;
var port = 3000;
var ip = "127.0.0.1";

// var streamer = function(request, response) {

//   console.log('streamer log');
//   var stream = fs.createReadStream(path.join(basePath, "/"));
//   stream.on('error', function() {
//     helpers.sendResponse(response, null, 404);
//   });
//   stream.pipe(response);
// };

var reader = function(request, response) {

  filename = path.join(basePath, "/public/index.html");

  // fs.exists(filename, function(exists) {
  //   if(!exists) {
  //     console.log('doesn\'t exist');
  //     helpers.sendResponse(response, null, 404);
  //   }
  // });

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type' : "text/html"
};

  fs.readFile(filename, function(err, file) {
    if(err) {
      console.log('err on reader');
      console.log(filename);
      helpers.sendResponse(response, null, 404);
      return;
    }
    console.log('some kind of sucess on reader?')
    response.writeHead(200, headers);
    response.write(file);
    response.end();
  });
}

var urls = {
  "/classes/messages" : requests.requestHandler,
  "/classes/room1" : requests.requestHandler,
  "/" : reader
};

var server = http.createServer(function(request, response) {

  var urlPath = url.parse(request.url).pathname;

  if(urls[urlPath]) {
    urls[urlPath](request, response, urlPath);
  } else {
    helpers.sendResponse(response, null, 404);
  }
 
  //   fs.readFile('../client/client/', function(err, data) {
  //   if (err) {
  //     response.writeHe  ad(404);
  //     response.end(JSON.stringify(err));
  //     return;
  //   }
  //   console.log(JSON.stringify(data));
  //   response.writeHead(200); 
  //   response.end(data);
  // });
  // fs.createReadStream("../client/client/index.html").pipe(response);

});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

