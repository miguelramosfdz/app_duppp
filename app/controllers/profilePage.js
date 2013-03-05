Ti.include('config.js');

var args = arguments[0] || {};

function close() {
	$.profilePage.close();
}

// Create another connection to get the user
var xhr2 = Titanium.Network.createHTTPClient();

var getUser = REST_PATH + '/user/user/' + args + '.json';

xhr2.open("GET", getUser);
xhr2.send();

xhr2.onload = function() {
	var userStatusCode = xhr2.status;

	if(userStatusCode == 200) {
		var userResponse = xhr2.responseText;
		var user = JSON.parse(userResponse);

		$.author_image.image = SITE_PATH + '/sites/default/files/styles/profil/public/pictures/'+user.picture.filename;
		$.author.text = '@'+user.name;
	}
}
