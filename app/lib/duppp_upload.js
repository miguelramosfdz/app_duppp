Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *  Initialize variables
 */

var mediaQueue = [],
    ajax = Titanium.Network.ajax,
    nodeUrl = REST_PATH + '/node',
    processed = false;

/*
 *  Add upload to list of upload files.
 *
 *  @media is url.
 *  @contribution is struture of node contribution.
 *
 */
var uploadFile = function (media, contribution) {

  if (Titanium.Network.online && !processed) {

    processed = true;

    // Use $.ajax to create the node
    ajax({
      type: "POST",
      url: nodeUrl,
      data: JSON.stringify(contribution), // Stringify the node
      dataType: 'json',
      contentType: 'application/json',
      // On success do some processing like closing the window and show an alert
      success: function (data) {

        Titanium.API.fireEvent('startUpload');

        /* success callback fired after media retrieved from gallery */
        var xhr_video = Titanium.Network.createHTTPClient();
        xhr_video.onsendstream = function(e){

          var data = {
            progressValue: e.progress
          };

          Titanium.API.fireEvent('uploadInProgress', data);
        };
        xhr_video.onerror = function (e) {
          processUpload();
        };
        xhr_video.onload = function (e) {

          mediaQueue.shift();

          processed = false;

          processUpload();

          Titanium.API.fireEvent('uploadFinish');

        };
        xhr_video.open('POST', REST_PATH + '/node/' + data.nid + '/attach_file');
        xhr_video.send({
          "files[video]": media, /* event.media holds blob from gallery */
          "field_name": "field_contribution_video"
        });
      }
    });
  }

};

/*
 *  Add upload to list of upload files.
 *
 *  @media is file.
 *  @gid is ID of group.
 *  @date is timestamp.
 *  @uid is ID of author.
 *
 */
var addFile = function (media, gid, date, uid) {

  var file;

  // Create a new node object
  var contribution = {
    node: {
      title: date,
      type: 'contribution',
      language: 'und',
      "og_group_ref": {
        "und": [
          {
            "target_id": gid
          }
        ]
      },
      uid: uid,
      status: 1
    }
  };

  // Put the row in a table if the user are not online.
  if (Titanium.Network.online) {

    uploadFile(media, contribution)

  } else {

    file = saveFile({
      file: media,
      filename: date + '_' + gid + '.MOV'
    });

    contribution.mediaElement = file;

    mediaQueue.push(contribution)

  }

};

/*
 *  Upload first row of the queue.
 */
var processUpload = function () {

  if (Titanium.Network.online) {
    // Check if array still have file to upload.
    if (mediaQueue.length === 0) {

      return alert("No video need to be upload");

    } else {

      var contribution = mediaQueue[0],
        file = Ti.Filesystem.getFile(contribution.mediaElement);

      if (contribution) {
        uploadFile(file.read(), contribution.node);
      }

    }
  }


};

// OS
if(Ti.Platform.osname === 'iPhone' || Ti.Platform.osname === 'iPad') {
  var ios = true;
}

/**
 * Save file function
 *
 * @file: Binary file (Blob)
 * @filename: Name of file (String)
 *
 */
function saveFile(_args) {

  // Test if External Storage (Android only)
  if(Ti.Filesystem.isExternalStoragePresent()){
    var file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, _args.filename);
  }

  // No SD or iOS
  else {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _args.filename);
  }

  // Save file
  file.write(_args.file);

  // Debug: Test if file exist now
  if(file.exists) {
    Ti.API.info('[saveFile] Saved: YES! (' + file.nativePath + ')');
  } else {
    Ti.API.info('[saveFile] Saved: NO!');
  }

  // Return full path of file
  if(ios && Ti.version <= '1.8.2') {
    var iosPath = Ti.Filesystem.applicationDataDirectory + _args.filename;
    iosPath = iosPath.replace('file://','app://');

    return iosPath;
  }
  else {
    return file.nativePath;
  }
}

exports.mediaQueue = mediaQueue;
exports.addFile = addFile;
exports.processUpload = processUpload;
