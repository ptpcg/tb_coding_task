  //
  // require the native http module, as well as director.
  //
  var http = require('http'),
      director = require('director');

  //
  // create some logic to be routed to.
  //
  function login() {
    this.res.writeHead(200, { 'Content-Type': 'text/plain' })
    this.res.end('hello world');
  }
  function reg(){
      //Show registration
      
      //Do registration stuff
  }
  //
  // define a routing table.
  //
  var router = new director.http.Router({
    '/login': {
      get: login
    },
    '/register': {
      get: reg
    }
  });

  //
  // setup a server and when there is a request, dispatch the
  // route that was requested in the request object.
  //
  var server = http.createServer(function (req, res) {
    router.dispatch(req, res, function (err) {
      if (err) {
        res.writeHead(404);
        res.end();
      }
    });
  });