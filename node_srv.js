  //
  //Dependencies
  //
  var express = require('express'), //Express.js
  	  http = require('http'), //HTTP Core
      director = require('director'), //FlatIron Director*
      fs = require('fs'); //FileSystem Core
  
  //Instantiate express
  var srv = express();
  
  //
  //Main App Obj
  //
  var app = {
      view_dir:__dirname+"/ui/views/", //View files directory
      view_ext:".html", //View file extension
      port:2013, //App Port
  };

  //
  // Routing
  //

  // define routing table.
  var router = new director.http.Router({
    '/login': {
      get: login
    },
    '/register': {
      get: reg
    }
  });
  
  //route method
  var route = function(req,res,next){
  	router.dispatch(req, res, function (err) {
      if (err) {
        res.writeHead(404);
        res.end("Le Fail - Not Found");
      }
    });
  };
  
  //Method for login
  function login() {
  	//Do Login Stuff
  	var view = getView("login",this); //Get view for login
  }
  
  //Method for register
  function reg(){
      //Do registration stuff
      var view = getView("register",this); //Get view for login
  }
  
  //Method displays view 
  function getView(view,req){
  	//try to read view file
  	fs.readFile(app.view_dir+view+app.view_ext, 'utf8', function (err,data) {
	  if (err) {
	  	//if error
	    var err_msg = "<pre>"+err+"</pre>"; //get error msg
	    req.res.writeHead(500, { 'Content-Type': 'text/html' }); //set header to 500 (internal server error)
	  	req.res.end(err_msg); //send content
	  }else{
	  	//if good
	  	req.res.writeHead(200, { 'Content-Type': 'text/html' }); //set header to 200 (OK)
	  	req.res.end(data); //send content
	  }
      
	  
	});
  }
  
  //
  //Start Server
  //

  //set static file server the easy way w/ express
  srv.use(express.static(__dirname+"/ui"));
  
  //tell express to use route method
  srv.use(route);
  
  //fire up the server & listen
  http.createServer(srv).listen(app.port, function(){
  	console.log("Express server listening on port " + app.port);
  });
    
