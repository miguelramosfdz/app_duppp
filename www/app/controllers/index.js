// Pull in the core APP singleton
var APP = require("core");

// Make sure we always have a reference to global elements throughout the APP singleton
APP.MainWindow = $.MainWindow;
APP.LoginWindow = Alloy.createController('user').getView('userLogin');
APP.GlobalWrapper = $.GlobalWrapper;
APP.ContentWrapper = $.ContentWrapper;
APP.Tabs = $.Tabs;
APP.SlideMenu = $.SlideMenu;
APP.SlideMenuRight = $.SlideMenuRight;
APP.eventsOpen = $.eventsOpen;

// Start the APP
APP.init();