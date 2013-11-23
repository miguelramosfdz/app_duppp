/*
 *  Initialize variables
 */

/* global Ti, Alloy, Titanium, alert */

var drupalServices = require('drupalServices'),
  APP = require("core"),
  processed = false,
  medias = APP.media;

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

  'use strict';

  // Need to be online.
  if (Titanium.Network.online && !processed) {

    // Pass to true to avoid parallel upload.
    processed = true;

    drupalServices.createNodeContribution(
      contribution,
      function (data) {
        // Add callback events when the contribution is created.
        Titanium.API.fireEvent('startUpload');

        var node = {
          'files[video]': media, // Blob file
          'field_name': 'field_contribution_video' // Field name in API
        };

        drupalServices.attachFile(
          node,
          data.nid,
          function() {
            // Delete current row, if the video is uploaded.
            var model = medias.shift();

            model.destroy();

            processed = false;

            // try to upload the next row.
            processUpload();

            // Add callback for upload finish.
            if (medias.length === 0) {
              Titanium.API.fireEvent('uploadFinish');
            }
          },
          function() {
            processed = false;

            // If the attach file get an error, try again.
            processUpload();
          },
          '',
          function(json) {
            Titanium.API.fireEvent('uploadInProgress', json);
          }
        );

      },
      function() {
        alert('There was an error, try again.');
      }
    );
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

  'use strict';

  var file,
    model;

  // Create structure of node object.
  var contribution = {
    node: {
      title: date,
      type: 'contribution',
      language: 'und',
      'og_group_ref': {
        'und': [
          {
            'target_id': gid
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

  model = Alloy.createModel('media', {node: JSON.stringify(contribution.node), file: contribution.mediaElement});
  medias.add(model);
  model.save();

  // Process the upload.
  processUpload();

};

/*
 *  Upload first row of the queue.
 */
var processUpload = function () {

  'use strict';

  if (Titanium.Network.online) {

    if (APP.Network.type == APP.sendConnection || APP.sendConnection == '3G') {

      medias.fetch();

      // Check if array still have file to upload.
      if (medias.length === 0) {

        return Ti.API.info('No video need to be upload');

      } else {

        // Get the row and upload her.
        var contributions = medias.toJSON();

        var contribution = contributions.shift(),
          file = Ti.Filesystem.getFile(contribution.file);

        if (contribution) {
          uploadFile(file.read(), JSON.parse(contribution.node));
        }

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

  'use strict';

  var file;

  // Test if External Storage (Android only)
  if(Ti.Filesystem.isExternalStoragePresent()){
    file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, _args.filename);
  }

  // No SD or iOS
  else {
    file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _args.filename);
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

Ti.App.addEventListener("resumed", function () {
  processUpload();
});

exports.addFile = addFile;
exports.processUpload = processUpload;
