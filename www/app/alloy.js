Alloy.Collections.recent = Alloy.createCollection('recent');
Alloy.Collections.media = Alloy.createCollection('media');

if (!Ti.App.Properties.getString('sendConnection')) {
  Ti.App.Properties.setString('sendConnection', '3G');
}