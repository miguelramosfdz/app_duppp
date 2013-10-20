var APP = require("core");
var dupppUpload = require('dupppUpload');

$.init = function() {

};

$.clear = function() {
  $.Tabs.setData([]);
};

$.setIndex = function(_index) {
  $.Tabs.selectRow(_index);
};

$.openCamera = function(nid) {

  var user = {
    uid: Ti.App.Properties.getInt("userUid"),
    sessid: Ti.App.Properties.getString("userSessionId"),
    session_name: Ti.App.Properties.getString("userSessionName"),
    name: Ti.App.Properties.getString("userName")
  };

  Ti.Media.showCamera({

    success: function(event) {

      dupppUpload.addFile(event.media, nid, new Date().getTime(), user.uid);

    },
    error: function(error) {
      // create alert
      var a = Titanium.UI.createAlertDialog({title:'Video'});

      // set message
      if (error.code == Titanium.Media.NO_VIDEO) {
        a.setMessage('Device does not have video recording capabilities');
      } else {
        a.setMessage('Unexpected error: ' + error.code);
      }

      // show alert
      a.show();
    },
    mediaTypes: Ti.Media.MEDIA_TYPE_VIDEO,
    videoQuality: Ti.Media.QUALITY_MEDIUM,
    showControls: true
  });
};

$.openForm = function() {

  var win = Alloy.createController('eventForm').getView('eventFormWindow');

  APP.addChild('eventForm', {}, true);
};

$.addData = function(events) {

  $.tabs = [];

  var create = Ti.UI.createTableViewRow({
    height: "60dp",
    backgroundSelectedColor: "#27ae60",
    selectedBackgroundColor: "#27ae60"
  });

  var viewCreate = Ti.UI.createView({
    backgroundColor: '#40d47e',
    width: Ti.UI.FILL
  });

  var createLabel = Ti.UI.createLabel({
    text: 'Create an Event',
    top: "0dp",
    height: "60dp",
    backgroundcolor: "#27ae60",
    font: {
      fontSize: "18dp",
      fontFamily: "Lato-Regular"
    },
    color: "#FFF",
    touchEnabled: false
  });

  viewCreate.add(createLabel);
  create.add(viewCreate);

  $.tabs.push(create);

  var viewHeader = Ti.UI.createView({
    backgroundColor: '#2980b9',
    height: "27dp",
    width: Ti.UI.FILL
  });

  var header = Ti.UI.createLabel({
    text: 'Events in progress',
    top: "0dp",
    height: "25dp",
    left: '10dp',
    font: {
      fontSize: "13dp",
      fontFamily: "Lato-Regular"
    },
    color: "#FFF",
    touchEnabled: false
  });

  viewHeader.add(header);

  var section1 = Ti.UI.createTableViewSection({
    headerView: viewHeader
  });

  $.tabs.push(section1);

  for(var i = 0; i < events.data.length; i++) {
    var tab = Ti.UI.createTableViewRow({
      height: "40dp",
      backgroundcolor: "#111",
      backgroundSelectedColor: "#222",
      selectedBackgroundColor: "#222",
      nid: events.data[i].nid
    });

    var label = Ti.UI.createLabel({
      text: events.data[i].title,
      top: "0dp",
      left: "10dp",
      right: "13dp",
      height: "40dp",
      font: {
        fontSize: "17dp",
        fontFamily: "Lato-Regular"
      },
      color: "#FFF",
      touchEnabled: false
    });

    tab.add(label);

    $.tabs.push(tab);
  }

  $.Tabs.setData($.tabs);
};

Ti.API.addEventListener('myEvents:fetched', function (data) {
  $.addData(data);
});

$.Tabs.addEventListener("click", function(_event) {
  if(typeof _event.source.nid !== "undefined") {
    $.openCamera(_event.source.nid);
  } else {
    $.openForm();
    APP.closeMenuRight();
  }
});

// Move the UI down if iOS7+
if(OS_IOS && APP.Device.versionMajor >= 7) {
  $.Tabs.top = "20dp";
}