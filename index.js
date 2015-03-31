var express = require("express");
var DataStore = require("nedb");
var json_api = require("json_api");

var app = express();

var db = new DataStore({filename: "taskify", autoload: true});

app.use(express.static("public"));

app.use(require("body-parser").json());

app.use("/taskify", json_api(db));

app.set("view engine", "jade");

app.get("/:page", function(req, res) {
  res.render("page", {
    pageRequested: req.params.page
  });
});

console.log("Listening on :8025");
app.listen(8025);
