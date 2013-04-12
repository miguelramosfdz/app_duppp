Ti.include('config.js');
Ti.include("tiajax.js");

var args = arguments[0] || {};

// Map field with correct values
$.author.text = args.user_name;
$.author_image.image = args.avatar;
$.videoPlayer.url = args.video;
$.f_title.text = args.title;
$.f_date.text = args.created;



var data = [],
  url = REST_PATH + '/event/' + args.nid + '.json',
  urlLike = REST_PATH + '/event/' + args.nid + '/flag',
  ajax = Titanium.Network.ajax;

var xhr = Ti.Network.createHTTPClient({
  onload: function(e) {

    var json = JSON.parse(this.responseText);

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

  },
  onerror: function(e) {
    Ti.API.debug(e.error);
    alert('error');
  },
  timeout: 5000
});

$.eventPage.addEventListener('open', function () {
  xhr.open("GET", url);
  xhr.send();
});

function like () {

  if ($.like.title === 'Like') {
    var data = {
      "action": "flag",
      "flag_name": "like"
    };
  } else {
    var data = {
      "action": "unflag",
      "flag_name": "like"
    };
  }

  ajax({
    type: "POST",
    url: urlLike,
    data: JSON.stringify(data), // Stringify the node
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      if ($.like.title === 'Like') {
        $.like.title = 'Unlike';
      } else {
        $.like.title = 'Like';
      }
    }
  });
}
