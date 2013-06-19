/*
 *  Initialize variables
 */

var args = arguments[0] || {};

// Map field with correct values
$.name.text = args.name;
$.image.image = (args.field_avatar.length == 0) ? '' : args.field_avatar;
$.row.uid = args.uid;

$.row.addEventListener('click', function(e){
  var win = Alloy.createController('profilePage', args).getView();

  Titanium.API.fireEvent('openAsNavigation', {
    window: win
  });
});
