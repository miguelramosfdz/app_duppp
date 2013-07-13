// Create another connection to get the user
var drupalServices = require('drupalServices'),
  args = arguments[0] || {};

function prepareData(data) {
  dataEvents = [];

  data.forEach(function(event){
    // Add to the main view, only closed events
    if (event.field_event_closed_value === "1") {
      var newsItem = Alloy.createController('eventRow', event).getView();
      dataEvents.push(newsItem);
    }
  });

  $.table.setData(dataEvents);
}

$.profilePage.addEventListener('open', function() {

  $.authorImage.image = args.field_avatar;
  $.followerCount.text = args.follower_count;

  $.profilePage.title = args.name;

  drupalServices.userRetrieve({
    uid: args.uid,
    success: function(data) {

      // Check if user si flagged by the current user.
      if (data.user.is_flagged) {
        $.follow.title = 'Unfollow';
      } else {
        $.follow.title = 'Follow';
      }
      // map fields with correct values.
      $.followerCount.text = data.user.follow_count;
      $.eventCount.text = data.user.event_count;
      $.author.text = data.user.name;
    },
    error: function(data) {
      alert('error');
    }
  });

  drupalServices.userNodesList({
    uid: args.uid,
    success: function(json) {
      prepareData(json);
    },
    error: function(data) {
      alert('error');
    }
  })

});

function follow () {

  var data;

  if ($.follow.title === 'Follow') {
    data = {
      "action": "flag"
    };
  } else {
    data = {
      "action": "unflag"
    };
  }

  drupalServices.followUser({
    node: data,
    uid: args.uid,
    success: function(user) {
      if ($.follow.title === 'Follow') {
        $.follow.title = 'Unfollow';
      } else {
        $.follow.title = 'Follow';
      }
    },
    error: function(data) {
      alert('error');
    }
  });
}

