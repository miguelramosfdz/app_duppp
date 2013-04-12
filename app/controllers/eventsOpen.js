var url = REST_PATH + "/event.json?type=my_events";

var dupppUpload = require('duppp_upload');

var data = [];

var xhr = Ti.Network.createHTTPClient({
  onload: function(e) {

    data = [];

    // Add events to views
    json = JSON.parse(this.responseText);
    json.forEach(function(event){
      if (event.field_event_closed === "0") {
        var newsItem = Alloy.createController('eventOpenRow', event).getView();
        data.push(newsItem);
      }
    });
    $.labelOpen.text = data.length + " events in progress";

    $.table.setData(data);

    Titanium.UI.iPhone.setAppBadge(data.length);

    $.activityIndicator.hide();

    $.labelOpen.show();

  },
  onerror: function(e) {
    alert('error');
  },
  timeout: 5000
});

$.labelOpen.hide();
$.activityIndicator.show();

xhr.open("GET", url);
xhr.send();

Titanium.App.addEventListener('resume', function () {

  $.labelOpen.hide();
  $.activityIndicator.show();

  dupppUpload.processUpload();

  xhr.open("GET", url);
  xhr.send();
});

Titanium.API.addEventListener('eventCreated', function (data) {

  $.labelOpen.hide();
  $.activityIndicator.show();

  xhr.open("GET", url);
  xhr.send();
});


Titanium.API.addEventListener('startUpload', function (data) {

  $.view.animate({
    bottom: -150,
    duration: 200
  });

  $.provressView.show();
  $.pb.show();

});

Titanium.API.addEventListener('uploadInProgress', function (data) {

  $.provressViewLabel.text = (dupppUpload.mediaQueue.length + 1) + ' video';
  $.pb.setValue(data.progressValue * 100);

});

Titanium.API.addEventListener('uploadFinish', function (data) {

  $.view.animate({
    bottom: -170,
    duration: 200
  });

  $.provressView.hide();
  $.pb.hide();
  $.pb.setValue(0);

});

$.viewLabel.addEventListener('singletap', function (e) {
  $.view.animate({
    bottom: 0,
    duration: 500
  });
});

$.view.addEventListener('touchmove', function (e) {

  if (e.y > 0) {
    $.view.animate({
      bottom: -170,
      duration: 500
    });
  }

});
