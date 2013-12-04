var APP = require('core');
var CONFIG = arguments[0];

// Map field with correct values
$.name.text = CONFIG.name;
$.image.image = (CONFIG.field_avatar.length == 0) ? '' : CONFIG.field_avatar;
$.row.uid = CONFIG.uid;
$.row.name = CONFIG.name;
$.row.field_avatar = CONFIG.field_avatar;

// Don't open profile page if isNoReturn is true.
if (!CONFIG.isNoReturn) {
  $.row.addEventListener('click', function (e) {
    APP.addChild("profilePage", CONFIG);
  });
}
