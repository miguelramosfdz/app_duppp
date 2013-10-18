var APP = require("core");
var CONFIG = arguments[0] || {};
var drupalServices = require('drupalServices');
var commentFormWin = Alloy.createController('commentForm').getView();

$.init = function() {
  APP.log("debug", "event_event.init | " + JSON.stringify(CONFIG));

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  if(APP.Device.isHandheld) {
    $.NavigationBar.showBack({
      callback: function(_event) {
        APP.removeAllChildren();
      }
    });
  }

  $.retrieveData();
};

$.retrieveData = function() {
  drupalServices.nodeRetrieve({
    nid: CONFIG.nid,
    success: function(json) {

      $.handleData(CONFIG);

      if (json.is_flagged) {
        $.like.title = 'Unlike';
      } else {
        $.like.title = 'Like';
      }

      if (json.like_count.count) {
        $.likeCount.text = 'Likes ' + json.like_count.count;
      } else {
        $.likeCount.text = 'Likes 0';
      }

      $.commentCount.text = "Comments " + json.comment_count;

      // Map fiel with the correct value.
      for(var key in json.comments){
        var newsItem = Alloy.createController('commentRow', json.comments[key]).getView();
        $.commentsList.add(newsItem);
      }
    }
  });
};

$.handleData = function(_data) {
  APP.log("debug", "event_event.handleData");

  $.author.text = _data.user_name;
  $.author_image.image = _data.avatar;
  $.videoPlayer.url = _data.video;
  $.f_title.text = _data.title;
  $.f_date.text = _data.created;

};

$.videoPlayer.addEventListener('durationavailable', function() {
  if (this.duration < 600000) {
    $.videoPlayer.play();
  }
});

function like () {
  var data;

  if ($.like.title === 'Like') {
    $.like.title = 'Unlike';
    data = {
      "action": "flag",
      "flag_name": "like"
    };
  } else {
    $.like.title = 'Like';
    data = {
      "action": "unflag",
      "flag_name": "like"
    };
  }

  drupalServices.likeNode({
    node: data,
    nid: CONFIG.nid
  });
}

// Kick off the init
$.init();
