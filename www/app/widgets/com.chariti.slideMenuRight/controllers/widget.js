var APP = require("core");
var dupppUpload = require('dupppUpload');
var medias = APP.media;
var drupalServices = require('drupalServices');

$.init = function () {

};

$.clear = function () {
  $.Tabs.setData([]);
};

$.setIndex = function (_index) {
  $.Tabs.selectRow(_index);
};

$.openCamera = function (nid) {

  var user = {
    uid: Ti.App.Properties.getInt("userUid"),
    sessid: Ti.App.Properties.getString("userSessionId"),
    session_name: Ti.App.Properties.getString("userSessionName"),
    name: Ti.App.Properties.getString("userName")
  };

  Ti.Media.showCamera({

    success: function (event) {

      dupppUpload.addFile(event.media, nid, new Date().getTime(), user.uid);

    },
    error: function (error) {
      // create alert
      var a = Titanium.UI.createAlertDialog({
        title: 'Video'
      });

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

$.openForm = function () {

  var win = Alloy.createController('eventForm').getView('eventFormWindow');

  APP.addChild('eventForm', {}, true);
};

$.confirmDialog = function (_data) {
  var alert = Titanium.UI.createAlertDialog({
    title: 'Close',
    message: 'Are you sure you want to close this event and make the film ?',
    buttonNames: ['Yes', 'No'],
    cancel: 1
  });

  alert.addEventListener('click', function (e) {
    //Clicked cancel, first check is for iphone, second for android
    if (e.cancel === e.index || e.cancel === true) {
      return;
    }

    //now you can use parameter e to switch/case

    switch (e.index) {
    case 0:
      $.close(_data);
      break;

      //This will never be reached, if you specified cancel for index 1
    case 1:
      Titanium.API.info('Clicked button 1 (NO)');
      break;

    default:
      break;
    }

  });

  alert.show();
};

$.close = function (_data) {

  medias.fetch();

  // Doesn't allow to close if you still have event to close.
  if (medias.length === 0) {

    APP.closeMenuRight();
    APP.openLoading();

    drupalServices.closeNode(
      _data.nid,
      function (data) {
        APP.closeLoading();
        Ti.API.fireEvent('eventCreated');
      },
      function (data) {
        APP.closeLoading();
        alert('Sorry, your event cannot be closed.');
      }
    );

  } else {
    alert('Sorry, your cannot close your event, because some videos need to be uploaded.');
  }
};

$.addData = function (events) {

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

  create.addEventListener("click", function (_event) {
    $.openForm();
    APP.closeMenuRight();
  });

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

  for (var i = 0; i < events.data.length; i++) {
    var tab = Ti.UI.createTableViewRow({
      height: "40dp",
      backgroundcolor: "#111",
      backgroundSelectedColor: "#222",
      selectedBackgroundColor: "#222"
    });

    var take = Titanium.UI.createButton({
      title: 'Rec',
      backgroundColor: "#c0392b",
      backgroundImage: 'none',
      right: 60,
      width: 60,
      font: {
        fontSize: "17dp",
        fontFamily: "Lato-Regular"
      },
      height: "30dp",
      nid: events.data[i].nid
    });

    var done = Titanium.UI.createButton({
      title: 'Done',
      backgroundColor: "#27ae60",
      backgroundImage: 'none',
      right: 5,
      width: 50,
      font: {
        fontSize: "15dp",
        fontFamily: "Lato-Regular"
      },
      height: "30dp",
      nid: events.data[i].nid
    });

    take.addEventListener('click', function (_event) {
      $.openCamera(_event.source.nid);
    });

    done.addEventListener('click', function (_event) {
      $.confirmDialog(_event.source);
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
    tab.add(take);

    if (Ti.App.Properties.getInt("userUid") == events.data[i].uid) {
      tab.add(done);
    }

    $.tabs.push(tab);
  }

  $.Tabs.setData($.tabs);
};

Ti.API.addEventListener('myEvents:fetched', function (data) {
  $.addData(data);
});

// Move the UI down if iOS7+
if (OS_IOS && APP.Device.versionMajor >= 7) {
  $.Tabs.top = "20dp";
}
