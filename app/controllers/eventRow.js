Ti.include('config.js');

var args = arguments[0] || {};

$.f_title.text = args.node_title;
$.f_date.text = moment.unix(args.node_created).fromNow();;
$.f_image.image = 'http://stage.duppp.com/medias/eventmedia/1471/preview.jpg';

// Create another connection to get the user
var xhr2 = Titanium.Network.createHTTPClient();

var getUser = REST_PATH + '/user/user/' + args.uid + '.json';

xhr2.open("GET", getUser);
xhr2.send();

xhr2.onload = function() {
	var userStatusCode = xhr2.status;

	if(userStatusCode == 200) {
		var userResponse = xhr2.responseText;
		var user = JSON.parse(userResponse);
		
		$.author.text = '@' + user.name;
		$.author_image.image = SITE_PATH + '/sites/default/files/styles/profil/public/pictures/'+user.picture.filename;
	}
}

$.author_image.addEventListener('touchstart', function(e){
	var win = Alloy.createController('profilePage', args.uid).getView();
	win.title = $.author.text;
	
	win.open({
		modal: true
	})
});

$.f_image.addEventListener('touchstart', function(e){
	var win = Alloy.createController('eventPage', args.nid).getView();
	win.title = "Event";
	
	win.open({
		modal: true,
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	})
});

var current_row; 

$.row.addEventListener('swipe', function(e) {

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

