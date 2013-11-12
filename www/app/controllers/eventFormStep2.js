var APP = require('core');
var CONFIG = arguments[0] || {};
var data = [],
  clickedRows = [],
  usersSelected = [],
  recents = APP.recent,
  drupalServices = require('drupalServices');

$.init = function() {
  APP.log("debug", "eventForm.init | " + JSON.stringify(CONFIG));

  recents.fetch();

  var users = recents.toJSON(),
     data = prepareData(users);

  data.reverse();

  $.table.setData(data);

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  if(CONFIG.isChild === true) {
    $.NavigationBar.showBack();
  }

  if(APP.Settings.useSlideMenu) {
    $.NavigationBar.showBack();
    $.NavigationBar.showDone({
      callback: function() {
        $.createEvent();
      }
    });
  } else {
    $.NavigationBar.showSettings();
  }
};

//
//
// HELPERS
//
//

// Save the recent user selected to the database.
function recentUsers(users) {

  _.each(users, function(user) {
    var model = Alloy.createModel('recent', {name: user.name, uid: user.uid, field_avatar: user.field_avatar});
    var isExisting = recents.where({name: user.name});

    if (isExisting.length === 0) {
      recents.add(model);

      model.save();
    }
  });
}

// Store in Array all users selected.
function storeUsers(e) {

  'use strict';

  var row = e.row;
  var index = _.indexOf(clickedRows, row.uid);

  if (row.hasCheck) {
    row.setHasCheck(false);
    if (index >= 0) {
      clickedRows.splice(index, 1);
      usersSelected.splice(index, 1);
    }
  } else {
    row.setHasCheck(true);
    if (index < 0) {
      clickedRows.push(e.row.uid);
      usersSelected.push(e.row);
    }
  }
}

// Prepare data to put in table.
function prepareData(json) {

  var data = [];

  json.forEach(function(user){
    if (parseInt(user.uid) !== Ti.App.Properties.getInt("userUid")) {
      // Keep only user different from current user.
      user.isNoReturn = true;

      var newsItem = Alloy.createController('userRow', user).getView();

      if (_.indexOf(clickedRows, newsItem.uid) >= 0) {
        newsItem.hasCheck = true;
        newsItem.selected = !newsItem.selected;
      }

      data.push(newsItem);
    }
  });

  return data;
}

//
//
// EVENTS
//
//

var last_search = null;

$.search.addEventListener('return', function (e) {
  if (e.value !=  last_search) {
    last_search = e.value;
    APP.openLoading();

    drupalServices.searchUser(
      e.value,
      function(users) {

        var data = prepareData(JSON.parse(users));

        // Update View.
        $.table.setData(data);

        APP.closeLoading();
      }
    );

    $.search.blur();
  }
});

$.table.addEventListener('click', storeUsers);

///////////////

// Function to create an event
$.createEvent = function() {

  if (Ti.App.Properties.getInt("userUid")) {

    APP.openLoading();

    // Create a user variable to hold some information about the user
    drupalServices.createNode(
      {
        'type': CONFIG.type,
        'title': CONFIG.title,
        'language': CONFIG.language,
        'group_access': {
          'und': CONFIG.group_access.und
        },
        'field_event_date': {
          'und':[{
            'show_todate': CONFIG.field_event_date.und[0].show_todate,
            'value': {
              'month': CONFIG.field_event_date.und[0].value.month,
              'day': CONFIG.field_event_date.und[0].value.day,
              'year': CONFIG.field_event_date.und[0].value.year,
              'hour': CONFIG.field_event_date.und[0].value.hour,
              'minute': CONFIG.field_event_date.und[0].value.minute
            }
          }]
        },
        'uid': CONFIG.uid,
        'status': CONFIG.status
      },
      function (data) {

        APP.closeLoading();
        APP.closeMenuRight();
        APP.removeChild();

        Ti.API.fireEvent('eventCreated');

        var join = {
          uid: clickedRows
        };

        recentUsers(usersSelected);

        drupalServices.joinNode(
          join,
          data.nid
        );
      },
      function(data) {
        alert('There was an error, try again.');
      }
    );

  }
  else {
    alert('You need to login first');
  }
};

$.init();
