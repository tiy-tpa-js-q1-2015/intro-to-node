var express   = require("express");
var DataStore = require("nedb");

// Our express app
var app = express();

// our db
var db = new DataStore({
  filename: "nedb/tasks",
  autoload: true
});

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

app.get("/tasks", function(req, res){
  db.find({}, function(err, data){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.json(data);
    }
  });
});

app.post("/tasks", function(req, res){
  db.insert(req.body, function(err, data){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.json(data);
    }
  })
});


app.get("/tasks/:id", function(req, res){
  db.findOne({_id: req.params.id}, function(err, data){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.json(data);
    }
  });
});

app.put("/tasks/:id", function(req, res){

  db.update({_id: req.params.id}, req.body, {}, function(err, numberOfRecordsUpdated){

    if(err) {
      res.status(500).json({error: err.toString()});
      return;
    }

    db.findOne({_id: req.params.id}, function(err, data){

      if(err) {
        res.status(500).json({error: err.toString()});
      }
      else {
        res.json(data);
      }

    })

  });

});

app.delete("/tasks/:id", function(req, res){
  db.remove({_id: req.params.id}, {}, function(err, numRemoved){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.status(200).end();
    }
  })
});


console.log("Listening on :8025");
app.listen(8025);
