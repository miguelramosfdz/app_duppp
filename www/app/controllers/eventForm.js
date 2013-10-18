var APP = require('core');
var CONFIG = arguments[0] || {};

$.init = function() {
  APP.log("debug", "eventForm.init | " + JSON.stringify(CONFIG));

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  if(CONFIG.isChild === true) {
    $.NavigationBar.showBack();
  }

  if(APP.Settings.useSlideMenu) {
    $.NavigationBar.showMenu();
    $.NavigationBar.showNext({
      callback: function() {

        var user = {
          uid: Ti.App.Properties.getInt('userUid'),
          sessid: Ti.App.Properties.getString('userSessionId'),
          session_name: Ti.App.Properties.getString('userSessionName'),
          name: Ti.App.Properties.getString('userName')
        };

        var switchPrivate;

        if ($.switchPrivate.value == 1) {
          switchPrivate = '1';
        } else {
          switchPrivate = '0';
        }

        var node = {
          'type': 'event',
          'title': $.textArea.value,
          'language': 'und',
          'group_access': {
            'und': switchPrivate
          },
          'field_event_date': {
            'und':[{
              'show_todate': '0',
              'value': {
                'month': '2',
                'day': '14',
                'year': '2013',
                'hour': '20',
                'minute': '15'
              }
            }]
          },
          'uid': user.uid,
          'status': 1
        };

        APP.addChild('eventFormStep2', node);

      }
    });
  } else {
    $.NavigationBar.showSettings();
  }
};

$.textArea.addEventListener('focus', function() {
  $.textArea.value = '';
});

$.init();
