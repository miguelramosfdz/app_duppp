Ti.include('config.js');

/*
 *  Initialize variables
 */

var mediaQueue = [],
    drupalServices = require('drupalServices'),
    nodeUrl = REST_PATH + '/node',
    processed = false;

// OS
if(Ti.Platform.osname === 'iPhone' || Ti.Platform.osname === 'iPad') {
  var ios = true;
}

/*
 *  Add upload to list of upload files.
 *
 *  @media is url.
 *  @contribution is struture of node contribution.
 *
 */
var uploadFile = function (media, contribution) {

  // Need to be online.
  if (Titanium.Network.online && !processed) {

    // Pass to true to avoid parallel upload.
    processed = true;

    drupalServices.createNode({
      node: contribution,
      success: function (data) {
        // Add callback events when the contribution is created.
        Titanium.API.fireEvent('startUpload');

        // Attach file to past contribution node.
        var xhr_video = Titanium.Network.createHTTPClient();
        xhr_video.onsendstream = function(e){
          var data = {
            progressValue: e.progress
          };

          // Add callback to add a progress bar.
          Titanium.API.fireEvent('uploadInProgress', data);

        };
        xhr_video.onerror = function (e) {

          processed = false;

          // If the attach file get an error, try again.
          processUpload();

        };
        xhr_video.onload = function (e) {

          // Delete current row, if the video is uploaded.
          mediaQueue.shift();
          processed = false;

          // try to upload the next row.
          processUpload();

          // Add callback for upload finish.
          Titanium.API.fireEvent('uploadFinish');

        };

        xhr_video.setRequestHeader("ContentType", "multipart/form-data");

        // Send the xhr for upload the video.
        xhr_video.open('POST', REST_PATH + '/node/' + data.nid + '/attach_file');
        xhr_video.send({
          "files[video]": media, // Blob file
          "field_name": "field_contribution_video" // Field name in API
        });
      },
      error: function(data) {
        alert("There was an error, try again.");
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

  // Create structure of node object.
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
  // Save file in persistant way.
  file = saveFile({
    file: media,
    filename: date + '_' + gid + '.MOV'
  });

  contribution.mediaElement = file;

  // Add to the mediaQueue.
  mediaQueue.push(contribution);

  // Process the upload.
  processUpload();

};

/*
 *  Upload first row of the queue.
 */
var processUpload = function () {

  if (Titanium.Network.online) {
    // Check if array still have file to upload.
    if (mediaQueue.length === 0) {

      return Ti.API.info("No video need to be upload");

    } else {

      // Get the row and upload her.
      var contribution = mediaQueue[0],
        file = Ti.Filesystem.getFile(contribution.mediaElement);

      if (contribution) {
        uploadFile(file.read(), contribution.node);
      }

    }
  }


};

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
