Ti.include('config.js');

var args = arguments[0] || {};

function close() {
	$.profilePage.close();
}

// Create another connection to get the user
var url = REST_PATH + '/user/user/' + args + '.json';

var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
      json = JSON.parse(this.responseText);
      
      // map fields with correct values.
      $.author_image.image = SITE_PATH + '/sites/default/files/styles/profil/public/pictures/'+user.avatar.filename;
      $.author.text = '@'+user.name;
    },
    onerror: function(e) {
        Ti.API.debug(e.error);
        alert('error');
    },
    timeout: 5000
});
 

$.profilePage.addEventListener('open', function() {
  xhr.open("GET", url);
  xhr.send();
});

