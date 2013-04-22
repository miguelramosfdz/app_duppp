function saveFile(_args) {
    if (Ti.Filesystem.isExternalStoragePresent()) var file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, _args.filename); else var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _args.filename);
    file.write(_args.file);
    file.exists ? Ti.API.info("[saveFile] Saved: YES! (" + file.nativePath + ")") : Ti.API.info("[saveFile] Saved: NO!");
    if (ios && "1.8.2" >= Ti.version) {
        var iosPath = Ti.Filesystem.applicationDataDirectory + _args.filename;
        iosPath = iosPath.replace("file://", "app://");
        return iosPath;
    }
    return file.nativePath;
}

Ti.include("config.js");

var mediaQueue = [], drupalServices = require("drupalServices"), nodeUrl = REST_PATH + "/node", processed = false;

if ("iPhone" === Ti.Platform.osname || "iPad" === Ti.Platform.osname) var ios = true;

var uploadFile = function(media, contribution) {
    if (Titanium.Network.online && !processed) {
        processed = true;
        drupalServices.createNode({
            node: contribution,
            success: function(data) {
                Titanium.API.fireEvent("startUpload");
                var xhr_video = Titanium.Network.createHTTPClient();
                xhr_video.onsendstream = function(e) {
                    var data = {
                        progressValue: e.progress
                    };
                    Titanium.API.fireEvent("uploadInProgress", data);
                };
                xhr_video.onerror = function() {
                    processed = false;
                    processUpload();
                };
                xhr_video.onload = function() {
                    mediaQueue.shift();
                    processed = false;
                    processUpload();
                    Titanium.API.fireEvent("uploadFinish");
                };
                xhr_video.setRequestHeader("ContentType", "multipart/form-data");
                xhr_video.open("POST", REST_PATH + "/node/" + data.nid + "/attach_file");
                xhr_video.send({
                    "files[video]": media,
                    field_name: "field_contribution_video"
                });
            },
            error: function() {
                alert("There was an error, try again.");
            }
        });
    }
};

var addFile = function(media, gid, date, uid) {
    var file;
    var contribution = {
        node: {
            title: date,
            type: "contribution",
            language: "und",
            og_group_ref: {
                und: [ {
                    target_id: gid
                } ]
            },
            uid: uid,
            status: 1
        }
    };
    file = saveFile({
        file: media,
        filename: date + "_" + gid + ".MOV"
    });
    contribution.mediaElement = file;
    mediaQueue.push(contribution);
    processUpload();
};

var processUpload = function() {
    if (Titanium.Network.online) {
        if (0 === mediaQueue.length) return Ti.API.info("No video need to be upload");
        var contribution = mediaQueue[0], file = Ti.Filesystem.getFile(contribution.mediaElement);
        contribution && uploadFile(file.read(), contribution.node);
    }
};

exports.mediaQueue = mediaQueue;

exports.addFile = addFile;

exports.processUpload = processUpload;