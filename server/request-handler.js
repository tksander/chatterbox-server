 /*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require("url");
var helpers = require("./responseHelpers.js")

var results = [];
// Object ID
var id = 0;

var actions = {
  'GET': function(request, response) {
     helpers.sendResponse(response, {results: results}, 200);
  },
  'POST': function(request, response) {
    helpers.buildData(request, function(message) {
      message.objectId = ++id;
      results.push(message);
    }); 
    helpers.sendResponse(response, {results: results}, 201);
  },
  'OPTIONS': function(request, response) {
    helpers.sendResponse(response, null, 200);
  }
};

var requestHandler = function(request, response) {
  
  var method = request.method;

  if(actions[method]) {
    actions[method](request, response);
  } else {
    helpers.sendResponse(response, null, 404);
  }

};

module.exports.requestHandler = requestHandler;
