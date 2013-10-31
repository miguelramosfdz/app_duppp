var args = arguments[0] || {};
var APP = require('core');
var videoPlayer;
var drupalServices = require('drupalServices');
var dialog;

// Map fields with correct values.
$.f_title.text = args.title;
$.f_date.text = args.created;
$.author_image.image = (args.field_avatar.length == 0) ? '' : args.field_avatar;
$.author.text = args.name;
$.thumbnail.image = (args.video_thumbnail.length == 0) ? '' : args.video_thumbnail;


$.init = function() {

  $.initDialog();
}


// Open profile page when you click on the avatar image.
$.author_image.addEventListener('singletap', function(e){
  APP.addChild('profilePage', args);
});

// Open event page when you click on thumbnail.
$.thumbnail.addEventListener('singletap', function(e){

  videoPlayer = Titanium.Media.createVideoPlayer({
    height : Ti.UI.FILL,
    width : Ti.UI.FILL,
    backgroundColor: '#FFF'
  });

  videoPlayer.url = (args.field_event_video_final.length == 0) ? '' : args.field_event_video_final;

  $.media.remove($.thumbnail);
  $.media.add(videoPlayer);
  videoPlayer.play();

  videoPlayer.addEventListener('complete', function(e){

    $.media.remove(videoPlayer);
    $.media.add($.thumbnail);

  });

});

$.comment.addEventListener('click', function(e){
  APP.addChild('commentForm', args, true);
});

$.like.addEventListener('click', function(e){
  $.addLike();
});

$.extra.addEventListener('click', function(e){
  dialog.show();
});

$.addLike = function() {
  var data;

  if ($.like.title === 'Like') {
    $.like.title = 'Unlike';
    data = {
      'action': 'flag',
      'flag_name': 'like'
    };
  } else {
    $.like.title = 'Like';
    data = {
      'action': 'unflag',
      'flag_name': 'like'
    };
  }

  drupalServices.likeNode({
    node: data,
    nid: args.nid
  });
};

$.initDialog = function() {

  var options = [];
  var mapping = [];

  options.push("Share with users");
  mapping.push("share_users");


  options.push("Cancel");
  mapping.push("cancel");

  dialog = Ti.UI.createOptionDialog({
    options: options,
    cancel: options.length - 1,
    selectedIndex: options.length - 1
  });

  dialog.addEventListener("click", function(_event) {
    switch(mapping[_event.index]) {
      case "share_users":
        APP.addChild('share', args);
        break;
    }
  });

};

$.init();
