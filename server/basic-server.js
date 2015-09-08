/* Import node's http module: */
var http = require("http");
var requests = require("./request-handler.js");
var fs = require("fs");
var url = require("url");
var helpers = require("./responseHelpers.js");


var port = 3000;
var ip = "127.0.0.1";

var urls = {
  "/classes/messages" : true,
  "/classes/room1" : true,
  "/": true,
};

var server = http.createServer(function(request, response) {

  var path = url.parse(request.url).pathname;

  if(urls[path]) {

    requests.requestHandler(request, response);
    
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

