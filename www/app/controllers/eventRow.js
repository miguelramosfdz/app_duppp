var args = arguments[0] || {};
var APP = require("core");

// Map fields with correct values.
$.f_title.text = args.title;
$.f_date.text = args.created;
$.author_image.image = (args.field_avatar.length == 0) ? '' : args.field_avatar;
$.author.text = args.name;
$.thumbnail.image = (args.video_thumbnail.length == 0) ? '' : args.video_thumbnail;

// Open profile page when you click on the avatar image.
$.author_image.addEventListener('singletap', function(e){
  APP.addChild("profilePage", args);
});

// Open event page when you click on thumbnail.
$.thumbnail.addEventListener('singletap', function(e){
  var node = {
    nid: args.nid,
    title: args.title,
    created: args.created,
    user_name: args.name,
    avatar: (args.field_avatar.length == 0) ? '' : args.field_avatar,
    video: (args.field_event_video_final.length == 0) ? '' : args.field_event_video_final,
    uid: args.uid
  };

  APP.addChild("eventPage", node);
});
