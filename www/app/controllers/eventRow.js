var args = arguments[0] || {};

// Map fields with correct values.
$.f_title.text = args.title;
$.f_date.text = args.created;
$.author_image.image = (args.field_avatar.length == 0) ? '' : args.field_avatar;
$.author.text = args.name;
$.thumbnail.image = (args.video_thumbnail.length == 0) ? '' : args.video_thumbnail;

// Open profile page when you click on the avatar image.
$.author_image.addEventListener('touchend', function(e){
	var win = Alloy.createController('profilePage', args).getView();
	win.title = $.author.text;

  Titanium.API.fireEvent('openAsNavigation', {
    window: win
  });
});

// Open event page when you click on thumbnail.
$.thumbnail.addEventListener('touchend', function(e){
  var node = {
    nid: args.nid,
    title: args.title,
    created: args.created,
    user_name: args.name,
    avatar: (args.field_avatar.length == 0) ? '' : args.field_avatar,
    video: (args.field_event_video_final.length == 0) ? '' : args.field_event_video_final,
    uid: args.uid
  }

	var win = Alloy.createController('eventPage', node).getView();
	win.title = "Event";

  Titanium.API.fireEvent('openAsNavigation', {
    window: win
  });
});

var current_row;

// Let appear the actions caption.
// $.caption.addEventListener('swipe', function(e) {

// 	if (!!current_row) {
// 		$.caption.animate({
// 			right: 0,
// 			duration: 300
// 		});
// 	}

// 	current_row = Ti.Platform.osname == 'android' ? this : e.row; // it looks like android does not have the e.row property for this event.

// 	$.caption.animate({
// 		right: -340,
// 		duration: 300
// 	});
// });

