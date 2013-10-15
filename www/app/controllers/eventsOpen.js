var dupppUpload = require('dupppUpload'),
    drupalServices = require('drupalServices'),
    data = [],
    medias = Alloy.Collections.media,
    eventsRaw;


function fetchEvents() {
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

      // Set a badge on application to see how many events still open.
      Titanium.UI.iPhone.setAppBadge(data.length);
    },
    error: function(data) {
      alert('error');
    }
  });
}


/*
 * When the view is instantiate.
 */

$.labelOpen.hide();
$.activityIndicator.show();

// Call the xhr.
Titanium.API.addEventListener('index:open', function(data) {
  fetchEvents();
});

/*
 * Event callback.
 */

Titanium.App.addEventListener('resume', function () {

  $.labelOpen.hide();
  $.activityIndicator.show();
  dupppUpload.processUpload();
  fetchEvents();
});

Titanium.API.addEventListener('eventCreated', function (data) {

  $.labelOpen.hide();
  $.activityIndicator.show();
  fetchEvents();
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
