var express = require ("express");
var app = express();
const request = require('request');

app.use(express.static("public"));
app.set("view engine", "ejs");


var port = (process.env.PORT || 8080);
app.listen(port, function(){
	console.log("server listening on port 8080");
});


var tableau = [];

app.get("/", function(req, res){
	res.render("home", {
		tabVille : tableau
	});
});


app.get("/add", function(req, res){
	if(req.query.ville != undefined && req.query.ville.length != "0") {
		request('http://api.openweathermap.org/data/2.5/weather?appid=cd78c73a5c2d28ccaf6cb02a81c82121&lang=fr&units=metric&q='+req.query.ville, function(error, result, body) {  
		    var body = JSON.parse(body);
	    	tableau.push(body);
	    	// console.log(body);
	    	res.redirect("/");
		});
	};
});

app.get("/delete", function(req, res){
	if(req.query.cle != "") {
        for(var i=0; i<tableau.length; i++) {
          if(i == req.query.cle){
            tableau.splice(i, 1);
          };
        };  
    };
	res.redirect("/");
});


