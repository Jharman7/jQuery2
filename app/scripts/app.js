$(document).ready(function() {

  $('#newTaskForm').hide();
  var listo = [];
  if ( localStorage.getItem('listo')) {
    alert('loading...')
    listo = localStorage.getItem('listo');
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].id === 'new') {
        $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + listo[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
      }
      if (listo[i].id === 'inProgress') {
        $('#currentList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + list[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
      }
      if (listo[i].id === 'archived') {
        $('#currentList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + list[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
      }
    }
  }

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
    localStorage.setItem('listo', listo);
  }

  var advanceTask = function (task) {
      var modified = task.innerText;
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
    localStorage.setItem('listo', listo);
  }

  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

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
