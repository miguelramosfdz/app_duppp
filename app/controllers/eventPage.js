Ti.include('config.js');

var args = arguments[0] || {};

// Map field with correct values
$.author.text = args.user_name; 
$.author_image.image = args.avatar;

// Function to close the window.s
function close() {
	$.eventPage.close();
}

// Get the data of the selected event.
var xhr = Titanium.Network.createHTTPClient();

var getNode = REST_PATH + '/events/node/' + args.nid + '.json';

xhr.open("GET", getNode);
xhr.send();

xhr.onload = function() {
	var userStatusCode = xhr.status;

	if(userStatusCode == 200) {
		var nodeResponse = xhr.responseText;
		var node = JSON.parse(nodeResponse);
		
		// Map fiel with the correct value.
		$.f_date.text = moment.unix(node.created).fromNow();;
		$.f_title.text = node.title;

	}
}