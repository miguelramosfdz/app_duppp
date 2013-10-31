var APP = require('core');
var CONFIG = arguments[0] || {};
var data = [],
  clickedRows = [],
  usersSelected = [],
  recents = Alloy.Collections.recent,
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
        $.addPeople();
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

    drupalServices.searchUser({
      search: e.value,
      success: function(users) {

        var data = prepareData(JSON.parse(users));

        // Update View.
        $.table.setData(data);

        APP.closeLoading();
      }
    });

    $.search.blur();
  }
});

$.table.addEventListener('click', storeUsers);

///////////////

// Function to create an event
$.addPeople = function() {

  APP.openLoading();

  if (Ti.App.Properties.getInt("userUid")) {
    // Create a user variable to hold some information about the user
    var join = {
      uid: clickedRows
    };

    recentUsers(usersSelected);

    drupalServices.joinNode({
      node: join,
      nid: CONFIG.nid,
      success: function() {

        APP.closeLoading();
        APP.removeChild();
      }
    });

  }
  else {
    alert('You need to login first');
  }
};

$.init();
