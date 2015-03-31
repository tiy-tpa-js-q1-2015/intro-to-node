var express   = require("express");

// Our express app
var app = express();

// our static assets
app.use(express.static("public"));

// We need this so we can read json that is posted
app.use(require("body-parser").json());

// tell express to use the jade view engine
app.set("view engine", "jade");

// our app index
app.get("/", function(req, res) {
  res.render("index");
});

var tasksRouter = require("./tasks_router");

app.use("/tasks", tasksRouter);


console.log("Listening on :8025");
app.listen(8025);
