var drupalServices = require('drupalServices'),
    medias = Alloy.Collections.media,
    data,
    eventsRaw;

var APP = require('core');


$.fetchEvents = function() {

  if (APP.Network.online) {

    $.labelOpen.hide();
    $.activityIndicator.show();

    drupalServices.nodeList({
      type: 'my_events',
      success: function(json) {
        data = [];
        eventsRaw = [];

        // Add events to views.
        json.forEach(function(event){

          // Keep only events open.
          if (event.field_event_closed === "0") {
            var newsItem = Alloy.createController('eventOpenRow', event).getView();
            data.push(newsItem);
            eventsRaw.push(event);
          }
        });

        var events = {
          data: eventsRaw
        };

        Titanium.API.fireEvent('myEvents:fetched', events);

        // Update View.
        $.table.setData(data);
        $.labelOpen.text = data.length + " events in progress";

        // Display the label with correct value.
        $.activityIndicator.hide();
        $.labelOpen.show();
      },
      error: function(data) {
        $.fetchEvents();
      }
    });
  }
}

Titanium.API.addEventListener('eventCreated', function (data) {
  $.fetchEvents();
});


Titanium.API.addEventListener('startUpload', function (data) {

  $.provressView.height = 20;

  $.view.animate({
    bottom: -150,
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
    bottom: -170,
    duration: 200
  });

  $.provressView.hide();
  $.pb.hide();
  $.provressView.height = 0;
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
