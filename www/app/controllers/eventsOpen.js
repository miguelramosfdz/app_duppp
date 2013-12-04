var APP = require('core');
var drupalServices = require('drupalServices'),
  medias = APP.media,
  data,
  eventsRaw;

$.fetchEvents = function () {

  if (APP.Network.online) {

    drupalServices.nodeList(
      'my_events',
      '',
      function (json) {
        data = [];
        eventsRaw = [];

        // Add events to views.
        json.forEach(function (event) {

          // Keep only events open.
          if (event.field_event_closed === "0") {
            eventsRaw.push(event);
          }
        });

        var events = {
          data: eventsRaw
        };

        Ti.API.fireEvent('myEvents:fetched', events);
      },
      function (data) {
        $.fetchEvents();
      }
    );
  }
}

Titanium.API.addEventListener('eventCreated', function (data) {
  $.fetchEvents();
});

Titanium.API.addEventListener('startUpload', function (data) {

  $.provressView.height = 20;

  $.view.animate({
    bottom: 0,
    duration: 200
  });

  $.provressView.show();
  $.pb.show();

});

Titanium.API.addEventListener('uploadInProgress', function (data) {

  $.provressViewLabel.text = medias.length + ' video';
  $.pb.setValue(data.progressValue * 100);

});

Titanium.API.addEventListener('uploadFinish', function (data) {

  $.view.animate({
    bottom: -20,
    duration: 200
  });

  $.provressView.hide();
  $.pb.hide();
  $.provressView.height = 0;
  $.pb.setValue(0);

});
