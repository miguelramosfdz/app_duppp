Ti.include('config.js');

// Change color of the button background

$.loginBtn.addEventListener('touchstart', function() { 
    $.loginBtn.backgroundGradient = {
        type: 'linear',
        startPoint: { x: '50%', y: '0%' },
        endPoint: { x: '50%', y: '100%' },
        colors: [ { color: '#2d3032', offset: 0.0}, { color: '#2d3032', offset: 1.0 } ],
  	};
});  

$.loginBtn.addEventListener('touchend', function() { 
	$.loginBtn.backgroundGradient = {
        type: 'linear',
        startPoint: { x: '50%', y: '0%' },
        endPoint: { x: '50%', y: '100%' },
        colors: [ { color: '#6a7179', offset: 0.0}, { color: '#2d3032', offset: 1.0 } ],
  	};
});   

function login(e){
	
    // Create an object to hold the data entered in the form
	var user = {
		username: $.loginUsr.value,
		password: $.loginPwd.value
	};
	
	// Define the url which contains the full url
	// in this case, we'll connecting to http://example.com/api/rest/user/login
	var url = REST_PATH + '/user/login';
	
	// Create a connection
	var xhr = Titanium.Network.createHTTPClient();

	xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');

	// Open the connection using POST
	xhr.open("POST",url);

	// Send the connection and the user object as argument
	xhr.send(user);

	// When the connection loads we do:
	xhr.onload = function() {
		// Save the status of the connection in a variable
		// this will be used to see if we have a connection (200) or not
		var statusCode = xhr.status;
		
		// Check if we have a valid status
		if (statusCode == 200) {

			// Create a variable response to hold the response
			var response = xhr.responseText;

			// Parse (build data structure) the JSON response into an object (data)
			var data = JSON.parse(response);

			// Set a global variable
			Titanium.App.Properties.setInt("userUid", data.user.uid);
			Titanium.App.Properties.setInt("userSessionId", data.sessid);
			Titanium.App.Properties.setInt("userSessionName", data.sesion_name);

			// Create another connection to get the user
			var xhr2 = Titanium.Network.createHTTPClient();

			var getUser = REST_PATH + '/user/' + data.user.uid + '.json';

			xhr2.open("GET", getUser);
			xhr2.send();
			
			xhr2.onload = function() {
				var userStatusCode = xhr2.status;

				if(userStatusCode == 200) {
					var userResponse = xhr2.responseText;
					var user = JSON.parse(userResponse);

					// Set the user.userName to the logged in user name
					Titanium.App.Properties.setString("userName", user.name);
					
					// Close the window.
					$.userLogin.close();
				}
			}
		}
		else {
			alert("There was an error");
		}
	}
};

// Choose betwee Login and Register page.
function switchViews() {
	if ($.switchBtn.title === "Login") {
		$.registerView.hide();
		$.loginView.show();
		$.switchBtn.title = "Get Duppp account";
	} else {
		$.loginView.hide();
		$.registerView.show();
		$.switchBtn.title = "Login"; 
	}
};

function register() {
	console.log('fock');
}

function close() {
	$.userLogin.close();
}
