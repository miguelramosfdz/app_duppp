var APP = require("core");
var CONFIG = arguments[0] || {};
var drupalServices = require('drupalServices');

$.init = function () {
  APP.log("debug", "profile.init | " + JSON.stringify(CONFIG));

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  $.authorImage.image = CONFIG.field_avatar;
  $.followerCount.text = CONFIG.follower_count;

  if (APP.Device.isHandheld) {
    $.NavigationBar.showBack({
      callback: function (_event) {
        APP.removeAllChildren();
      }
    });
  }

  $.retrieveData();
};

$.retrieveData = function () {

  drupalServices.userRetrieve(
    CONFIG.uid,
    function (data) {

      var value;

      // Check if user si flagged by the current user.
      if (data.user.is_flagged) {
        value = 'Unfollow';
      } else {
        value = 'Follow';
      }

      $.NavigationBar.showFollow({
        text: value,
        callback: function (_event) {
          $.follow(value);
        }
      });

      // map fields with correct values.
      $.followerCount.text = data.user.follow_count;
      $.eventCount.text = data.user.event_count;
      $.author.text = data.user.name;
    },
    function (data) {
      alert('error');
    }
  );

  drupalServices.userNodesList(
    CONFIG.uid,
    // Success
    function (json) {
      $.handleData(json);
    },
    // Fail
    function (data) {
      alert('error');
    }
  );
};

$.handleData = function (_data) {
  APP.log("debug", "profile.handleData");

  var rows = [];

  _data.forEach(function (event) {
    // Add to the main view, only closed events
    if (event.field_event_closed_value === "1") {
      var newsItem = Alloy.createController('eventRow', event).getView();
      rows.push(newsItem);
    }
  });

  $.table.setData(rows);

  var height = rows.length * 380;
  $.table.setHeight(height);

};

$.follow = function (value) {

  var data = {};

  if (value === 'Follow') {
    data.action = 'flag';
  } else {
    data.action = 'unflag';
  }

  drupalServices.followUser(
    data,
    CONFIG.uid,
    function (user) {
      if (value === 'Follow') {
        $.NavigationBar.rightLabel.title = 'Unfollow';
      } else {
        $.NavigationBar.rightLabel.title = 'Follow';
      }
    },
    function (data) {
      alert('error');
    }
  );
};

// Kick off the init
$.init();
