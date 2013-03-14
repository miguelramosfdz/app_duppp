Ti.include('config.js');

var args = arguments[0] || {};

// Map fields with correct values.
$.f_title.text = args.node_title;
$.f_date.text = moment.unix(args.node_created).fromNow();
$.author_image.image = (args.avatar.length == 0) ? '' : args.avatar;
$.author.text = args.user_name
$.f_image.image = (args.video_thumbnail.length == 0) ? '' : args.video_thumbnail;

// Open profile page when you click on the avatar image.
$.author_image.addEventListener('touchend', function(e){
	var win = Alloy.createController('profilePage', args.uid).getView();
	win.title = $.author.text;

  Titanium.API.fireEvent('openAsNavigation', {
    window: win
  });
});

// Open event page when you click on thumbnail.
$.f_image.addEventListener('touchend', function(e){
  var node = {
    nid: args.nid,
    user_name: args.user_name,
    avatar: (args.avatar.length == 0) ? '' : args.avatar,
    video: (args.video.length == 0) ? '' : args.video
  }
  
	var win = Alloy.createController('eventPage', node).getView();
	win.title = "Event";

  Titanium.API.fireEvent('openAsNavigation', {
    window: win
  });
});

var current_row; 

// Let appear the actions caption.
$.caption.addEventListener('swipe', function(e) {

	if (!!current_row) {
		$.caption.animate({
			right: 0,
			duration: 300
		});
	};

	current_row = Ti.Platform.osname == 'android' ? this : e.row; // it looks like android does not have the e.row property for this event.

	$.caption.animate({
		right: -340,
		duration: 300
	});
});

