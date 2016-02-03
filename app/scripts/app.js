$(document).ready(function() {

  $('#newTaskForm').hide();
  var listo = [];
  function Task (task) {
    this.task = task;
    this.id = 'new';
  }

  function addTask(task) {
    if (task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');
      $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
    }
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  }

  function advanceTask (task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
    task.remove();
  }

  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val();
    addTask(task);
  });

  $('#newListItem').on('click', function () {
      $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });

  $('#cancel').on('click', function (e) {
      e.preventDefault();
      $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });

})
