var userLoginWin = Alloy.createController('user').getView();
var eventsOpenWin = Alloy.createController('eventsOpen').getView();

// If you are logged open the index window
if (Titanium.App.Properties.getInt("userUid")) {
	$.indexView.open();
} else {
	userLoginWin.open();
}

// Open index window when the user is logged
userLoginWin.addEventListener('close', function () {
  $.indexView.open({
		transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
});

// Navigation between tabs.
Titanium.API.addEventListener('clickMenuChild', function(data) {
  $.indexView.tabs[data.tab_id].active = true;
});

Titanium.API.addEventListener('openAsNavigation', function(data) {
  $.indexView.activeTab.open(data.window);
});

$.indexView.add(eventsOpenWin);
