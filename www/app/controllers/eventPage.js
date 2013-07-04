var REST_PATH = Alloy.CFG.rest;

var data = [],
  commentFormWin = Alloy.createController('commentForm').getView(),
  args = arguments[0] || {},
  drupalServices = require('drupalServices');

// Map field with correct values
$.author.text = args.user_name;
$.author_image.image = args.avatar;
$.videoPlayer.url = args.video;
$.f_title.text = args.title;
$.f_date.text = args.created;

$.videoPlayer.addEventListener('durationavailable', function() {

  if (this.duration < 600000) {
    $.videoPlayer.play();
  }

});

$.eventPage.addEventListener('open', function () {

  drupalServices.nodeRetrieve({
    nid: args.nid,
    success: function(json) {
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
  })

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
    nid: args.nid
  })
}

function comment() {
  commentFormWin.open({
    modal: true
  });
}
