var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Collections.recent = Alloy.createCollection("recent");

Ti.App.Properties.getString("sendConnection") || Ti.App.Properties.setString("sendConnection", "3G");

Alloy.createController("index");