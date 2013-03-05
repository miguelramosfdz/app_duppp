var userLoginWin = Alloy.createController('user').getView();

if (Titanium.App.Properties.getInt("userUid")){
	$.indexView.open();
} else {
	userLoginWin.open();
}

userLoginWin.addEventListener('close', function() {
    $.indexView.open({
		transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
});
