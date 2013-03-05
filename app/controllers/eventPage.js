Ti.include('config.js');

var args = arguments[0] || {};

function close() {
	$.eventPage.close();
}

// Create another connection to get the user
var xhr2 = Titanium.Network.createHTTPClient();

var getNode = REST_PATH + '/events/node/' + args + '.json';

xhr2.open("GET", getNode);
xhr2.send();

xhr2.onload = function() {
	var userStatusCode = xhr2.status;

	if(userStatusCode == 200) {
		var nodeResponse = xhr2.responseText;
		var node = JSON.parse(nodeResponse);
		
		$.f_date.text = moment.unix(node.created).fromNow();;
		$.f_title.text = node.title;
		$.author_image.image = SITE_PATH + '/sites/default/files/styles/profil/public/pictures/'+user.picture.filename;
	}
}