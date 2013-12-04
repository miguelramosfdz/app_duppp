var APP = require("core");
var CONFIG = arguments[0] || {};
var drupalServices = require('drupalServices');
var commentFormWin = Alloy.createController('commentForm').getView();

$.init = function () {
  APP.log("debug", "event_event.init | " + JSON.stringify(CONFIG));

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  $.NavigationBar.showBack({
    callback: function (_event) {
      $.videoPlayer.stop();

      APP.removeAllChildren();
    }
  });

  $.retrieveData();
};

$.retrieveData = function () {
  drupalServices.nodeRetrieve({
    nid: CONFIG.nid,
    success: function (json) {

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
      for (var key in json.comments) {
        var newsItem = Alloy.createController('commentRow', json.comments[key]).getView();
        $.commentsList.add(newsItem);
      }
    }
  });
};
