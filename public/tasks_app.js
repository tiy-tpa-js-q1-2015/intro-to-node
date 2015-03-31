$(function(){

  var tasks = new Tasks();

  tasks.fetch().done(function() {

    var $rootUL = $("<ul/>");

    $("body").html($rootUL);

    tasks.each(function(task){

      var $li = $("<li/>");
      var $h2 = $("<h2/>").text(task.get("name"));
      var $ul = $("<ul/>");

      $li.append($h2);
      $li.append($ul);

      var milestones = new Milestones(null, {task: task});

      milestones.fetch().done(function(){

        milestones.each(function(milestone){

          var $innerLI = $("<li/>").text(milestone.get("name"));

          $ul.append($innerLI);

        });

      });

      $rootUL.append($li);

    });

  });

});
