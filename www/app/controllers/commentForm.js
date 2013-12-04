var drupalServices = require('drupalServices');
var APP = require('core');
var CONFIG = arguments[0] || {};
var isFirst = true;

$.init = function () {
  APP.log("debug", "event_event.init | " + JSON.stringify(CONFIG));

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  $.NavigationBar.showBack({
    callback: function (_event) {
      APP.removeChild(true);
      $.textArea.blur();
    }
  });

  if (APP.Device.height == 480) {
    $.tableWrapper.height = '90%';
  }

  $.retrieveData();
};

$.retrieveData = function () {
  APP.openLoading();
  drupalServices.nodeRetrieveComments(
    CONFIG.nid,
    function (json) {
      $.handleData(json);
      APP.closeLoading();
    },
    function () {
      APP.closeLoading();
    }
  );
};

$.handleData = function (_data) {
  var tableData = [],
    position;

  for (var key in _data) {
    var newsItem = Alloy.createController('commentRow', _data[key]).getView();
    tableData.push(newsItem);
  }

  $.table.setData(tableData);

  position = tableData.length - 1;
  $.table.scrollToIndex(position);
};

$.addComment = function (_data) {

  if (_data !== '' && _data !== 'Your comment') {
    drupalServices.createComment({
        'nid': CONFIG.nid,
        'subject': CONFIG.nid,
        'comment_body': {
          'und': [{
            'value': _data
          }]
        }
      },
      function () {
        $.textArea.blur();
        $.textArea.value = 'Your comment';
        $.button.backgroundColor = '#27ae60';
        $.textWrapper.bottom = 0;
        $.retrieveData();
      },
      function () {
        alert('There was an error, try again.');
      }
    );
  }

};

$.textArea.addEventListener('focus', function () {

  if (isFirst) {
    $.textArea.value = '';

    isFirst = false;
  }

  if (APP.Device.height == 480) {
    $.textWrapper.bottom = '52%';
  } else {
    $.textWrapper.bottom = '43%';
  }
});

$.textArea.addEventListener('return', function () {
  $.textWrapper.bottom = 0;
});

$.button.addEventListener('click', function () {
  $.button.backgroundColor = '#16a085';
  $.addComment($.textArea.value.trim());
});

// Kick off the init
$.init();
