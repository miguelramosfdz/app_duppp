var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Collections.recent = Alloy.createCollection("recent");

Alloy.Collections.media = Alloy.createCollection("media");

Ti.App.Properties.getString("sendConnection") || Ti.App.Properties.setString("sendConnection", "3G");

var drupalServices = require("drupalServices");

drupalServices.getToken({
    success: function(token) {
        Ti.App.Properties.setString("token", token);
        drupalServices.systemInfo({
            success: function(data) {
                0 !== data.user.uid ? Titanium.API.fireEvent("app:registred") : Titanium.API.fireEvent("app:anonymous");
            },
            error: function() {
                alert("Error, contact the admin");
            }
        });
    },
    error: function() {
        alert("Error, contact the admin");
    }
});

Alloy.createController("index");