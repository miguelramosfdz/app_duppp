/*
 *  Initialize variables
 */

var REST_PATH = Alloy.CFG.rest,
  data = [],
  dupppUpload = require('dupppUpload'),
  container ={};

container.button = Titanium.UI.createButton({
  color:'#fff',
  backgroundImage:'/images/BUTT_grn_on.png',
  backgroundSelectedImage:'/images/BUTT_grn_off.png',
  backgroundDisabledImage: '/images/BUTT_gry_on.png',
  bottom:10,
  width:120,
  height:40,
  font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  title:'Capture'
});

container.closebutton = Titanium.UI.createButton({
  color:'#fff',
  backgroundImage:'/images/BUTT_red_on.png',
  backgroundSelectedImage:'/images/BUTT_red_off.png',
  backgroundDisabledImage: '/images/BUTT_gry_on.png',
  top:10,
  width:120,
  height:40,
  font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  title:'Close cameras'
});

container.overlay = Titanium.UI.createView();
container.overlay.add(container.button);
container.overlay.add(container.closebutton);

container.cameraFlash = Ti.UI.createButton({
  color:'#fff',
  title:"auto",
  left:20,
  top:20,
  height:40,
  width:80,
  backgroundImage:"/images/BUTT_drk_on.png",
  font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'}
});
container.overlay.add(container.cameraFlash);

container.current = Ti.Media.CAMERA_FLASH_AUTO;
container.cameraFlashModes = Ti.Media.availableCameraFlashModes;


container.cameraFlash.addEventListener('click', function() {
  if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_AUTO) {
    container.cameraFlash.title = "on";
    Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_ON;
  } else if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_ON) {
    container.cameraFlash.title = "off";
    Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_OFF;
  } else {
    container.cameraFlash.title = "auto";
    Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_AUTO;
  }
});

container.cameraType = Ti.UI.createButton({
  color:'#fff',
  title:"front",
  top:20,
  right:20,
  height:40,
  width:80,
  backgroundImage:"/images/BUTT_drk_on.png",
  font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'}
});

container.cameras = Ti.Media.availableCameras;
for (var c=0;c<container.cameras.length;c++) {
  // if we have a rear camera ... we add switch button
  if (container.cameras[c]==Ti.Media.CAMERA_REAR) {
    container.overlay.add(container.cameraType);

    container.cameraType.addEventListener('click',function() {
      if (Ti.Media.camera == Ti.Media.CAMERA_FRONT) {
        container.cameraType.title = "front";
        Ti.Media.switchCamera(Ti.Media.CAMERA_REAR);
      } else {
        container.cameraType.title = "rear";
        Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
      }
    });
    break;
  }
}

container.button.addEventListener('click',function()
{
  Ti.Media.startVideoCapture();
  container.button.title = "Stop Video";
  container.button.backgroundImage = "/images/BUTT_red_on.png";
  container.button.backgroundSelectedImage = '/images/BUTT_red_off.png';
  container.cameraType.visible = false;
  container.cameraFlash.visible = false;
});


container.closebutton.addEventListener('click',function(){
  Ti.Media.hideCamera();
  container.button.title = "Capture";
  container.button.backgroundImage = "/images/BUTT_red_on.png";
  container.button.backgroundSelectedImage = '/images/BUTT_red_off.png';
  container.cameraType.visible = true;
  container.cameraFlash.visible = true;
});

/*
 * Utility functions.
 */

function removeAllChildren(viewObject){
  //copy array of child object references because view's "children" property is live collection of child object references
  var children = viewObject.children.slice(0);

  for (var i = 0; i < children.length; ++i) {
    viewObject.remove(children[i]);
  }
}

// When you click on tooltip, close the tooltip.
$.tooltipContainer.addEventListener("click", function(e) {

  if (e.source.id === 'tooltipContainer') {
    $.tooltipContainer.hide();
  }

});

function openEventForm() {

  $.tooltipContainer.hide();

  var eventForm = Alloy.createController('eventForm').getView();

  Titanium.API.fireEvent('openAsNavigation', {
    window: eventForm
  });
}

function openCamera(nid) {

  $.tooltipContainer.hide();

  var user = {
    uid: Titanium.App.Properties.getInt("userUid"),
    sessid: Titanium.App.Properties.getString("userSessionId"),
    session_name: Titanium.App.Properties.getString("userSessionName"),
    name: Titanium.App.Properties.getString("userName")
  }

  Ti.Media.showCamera({

    success: function(event) {

      dupppUpload.addFile(event.media, nid, new Date().getTime(), user.uid);

      container.button.title = "Capture";
      container.cameraType.visible = true;
      container.cameraFlash.visible = true;

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
    mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
    videoQuality: Titanium.Media.QUALITY_MEDIUM,
    overlay: container.overlay,
    showControls: false // don't show system controls
  });
}

function menuChild (e) {
  $.menu.hide();
  Titanium.API.fireEvent('clickMenuChild', {
    tab_id : e.source.index
  });
};

// Function to display the tooltip.
function openTooltip (){
  $.tooltipContainer.show();
}

var menuOpen = false;
// Function to display the menu.
function openMenu() {
  if (!menuOpen) {
    menuOpen = true;
    $.menu.show();
  } else {
    menuOpen = false;
    $.menu.hide();
  }
}

Titanium.API.addEventListener('myEvents:fetched', function (data) {

  // Remove previous buttons.
  removeAllChildren($.tableOpen);

  $.tableOpen.height = 0;
  $.tableOpen.hide();
  $.tableOpenLabel.hide();

  if (data.data.length > 0) {

    data.data.forEach(function(event){

      var label = event.title;

      if (event.uid != Titanium.App.Properties.getInt("userUid")) {
        label = event.title + ' - ' + event.name;
      }

      // Create button for each event.
      var openItem = Titanium.UI.createButton({
        title: label,
        backgroundImage: "none",
        backgroundGradient: {
          type: 'linear',
          startPoint: { x: '50%', y: '0%' },
          endPoint: { x: '50%', y: '100%' },
          colors: [ { color: '#0C99FC', offset: 0.0}, { color: '#0E76FC', offset: 1.0 } ]
        },
        width: Titanium.UI.FILL,
        font:{fontSize:17, fontFamily: 'Lato-Regular'},
        right: 10,
        top: 10,
        bottom: 5,
        height: 40,
        borderRadius: 5,
        left: 10,
        shadowColor:"#999",
        shadowOffset:{x:0,y:1},
        nid: event.nid
      });

      // Add event to open camera on each button.
      openItem.addEventListener("click", function(e) {
        openCamera(e.source.nid);
      });

      // Add to the view.
      $.tableOpen.add(openItem);
      $.tableOpen.height = 100;
      $.tableOpen.show();
      $.tableOpenLabel.show();

    });

  }

});
