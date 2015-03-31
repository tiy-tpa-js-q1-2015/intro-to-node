var express   = require("express");
var DataStore = require("nedb");
var json_api  = require("json_api");

var app = express();

var db = new DataStore({
  filename: "nedb/tasks",
  autoload: true
});

app.use(express.static("public"));

app.use(require("body-parser").json());

app.use("/tasks", json_api(db));

app.set("view engine", "jade");

app.get("/", function(req, res) {
  res.render("index");
});

console.log("Listening on :8025");
app.listen(8025);
