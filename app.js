var express = require("express");
var graphDao = require("./graph-service");
var config = require("./config");

var app = express();

//for static resources
app.use(express.static("static"));

app.get("/", function(request, response){
    response.redirect("/");
});

app.get("/graph", function(request, response){
    response.redirect("/");
});

app.get("/data", function(request, response){
    var data = graphDao.getGraphData();
    response.json(data).status(200);
});

//default fallthrough handler
app.use(function (req, res) {
    res.status(404).send("Resource Not Found");
});

var server;
module.exports = {
    start: function() {
        server = app.listen(config.serverPort, function(){
            console.log("app started");
        });
    },
    stop: function() {
        server.close(function(){
            console.log("app stopped");
        });
    }
}