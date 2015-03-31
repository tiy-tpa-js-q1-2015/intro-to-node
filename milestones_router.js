var express   = require("express");
var DataStore = require("nedb");

var router = express.Router({
  mergeParams: true
});

module.exports = router;

// our db
var db = new DataStore({
  filename: "nedb/milestones",
  autoload: true
});

router.get("/", function(req, res){
  db.find({_task_id: req.params.id}, function(err, data){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.json(data);
    }
  });
});

router.post("/", function(req, res){
  var data = req.body;
  data._task_id = req.params.id;
  db.insert(data, function(err, data){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.json(data);
    }
  })
});


router.get("/:id", function(req, res){
  db.findOne({_id: req.params.id}, function(err, data){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.json(data);
    }
  });
});

router.put("/:id", function(req, res){

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

router.delete("/:id", function(req, res){
  db.remove({_id: req.params.id}, {}, function(err, numRemoved){
    if(err) {
      res.status(500).json({error: err.toString()});
    }
    else {
      res.status(200).end();
    }
  })
});
