Alloy.Collections.recent = Alloy.createCollection('recent');

if (!Ti.App.Properties.getString('sendConnection')) {
  Ti.App.Properties.setString('sendConnection', '3G');
}