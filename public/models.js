(function(namespace) {

  var Task = Backbone.Model.extend({
    idAttribute: "_id"
  });

  var Tasks = Backbone.Collection.extend({

    url: "/tasks",

    model: Task,

    initialize: function() {
      this.on("add", function(model){
        if(model.isNew()){
          model.save();
        }
      });
    }

  });

  var Milestone = Backbone.Model.extend({
    idAttribute: "_id"
  });

  var Milestones = Backbone.Collection.extend({

    url: function() {
      return "/tasks/" + this.task.id + "/milestones";
    },

    model: Milestone,

    initialize: function(data, options) {
      this.task = options.task;

      this.on("add", function(model){
        if(model.isNew()){
          model.save();
        }
      });
    }

  });

  namespace.Tasks = Tasks;
  namespace.Milestones = Milestones;

})(window);
