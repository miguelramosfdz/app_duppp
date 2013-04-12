function saveFile(_args) {
    if (Ti.Filesystem.isExternalStoragePresent()) var file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, _args.filename); else var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _args.filename);
    file.write(_args.file);
    file.exists ? Ti.API.info("[saveFile] Saved: YES! (" + file.nativePath + ")") : Ti.API.info("[saveFile] Saved: NO!");
    if (ios && Ti.version <= "1.8.2") {
        var iosPath = Ti.Filesystem.applicationDataDirectory + _args.filename;
        iosPath = iosPath.replace("file://", "app://");
        return iosPath;
    }
    return file.nativePath;
}

Ti.include("config.js");

Ti.include("tiajax.js");

var mediaQueue = [], ajax = Titanium.Network.ajax, nodeUrl = REST_PATH + "/node", processed = !1, uploadFile = function(media, contribution) {
    if (Titanium.Network.online && !processed) {
        processed = !0;
        ajax({
            type: "POST",
            url: nodeUrl,
            data: JSON.stringify(contribution),
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                Titanium.API.fireEvent("startUpload");
                var xhr_video = Titanium.Network.createHTTPClient();
                xhr_video.onsendstream = function(e) {
                    var data = {
                        progressValue: e.progress
                    };
                    Titanium.API.fireEvent("uploadInProgress", data);
                };
                xhr_video.onload = function(e) {
                    mediaQueue.shift();
                    processed = !1;
                    processUpload();
                    Titanium.API.fireEvent("uploadFinish");
                };
                xhr_video.open("POST", REST_PATH + "/node/" + data.nid + "/attach_file");
                xhr_video.send({
                    "files[video]": media,
                    field_name: "field_contribution_video"
                });
            }
        });
    }
}, addFile = function(media, gid, date, uid) {
    var file, contribution = {
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
    if (Titanium.Network.online) uploadFile(media, contribution); else {
        file = saveFile({
            file: media,
            filename: date + "_" + gid + ".MOV"
        });
        contribution.mediaElement = file;
        mediaQueue.push(contribution);
    }
}, processUpload = function() {
    if (Titanium.Network.online) {
        if (mediaQueue.length === 0) return alert("No video need to be upload");
        var contribution = mediaQueue[0], file = Ti.Filesystem.getFile(contribution.mediaElement);
        contribution && uploadFile(file.read(), contribution.node);
    }
};

if (Ti.Platform.osname === "iPhone" || Ti.Platform.osname === "iPad") var ios = !0;

exports.mediaQueue = mediaQueue;

exports.addFile = addFile;

exports.processUpload = processUpload;