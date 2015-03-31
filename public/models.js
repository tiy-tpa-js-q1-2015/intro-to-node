(function(namespace) {

  var Task = Backbone.Model.extend({
    idAttribute: "_id"
  });

  var Tasks = Backbone.Collection.extend({

    url: "/tasks",

    model: Task

  });

  namespace.Tasks = Tasks;

})(window);
