function saveFile(_args) {
    "use strict";
    var file;
    file = Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, _args.filename) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _args.filename);
    file.write(_args.file);
    file.exists ? Ti.API.info("[saveFile] Saved: YES! (" + file.nativePath + ")") : Ti.API.info("[saveFile] Saved: NO!");
    if (ios && "1.8.2" >= Ti.version) {
        var iosPath = Ti.Filesystem.applicationDataDirectory + _args.filename;
        iosPath = iosPath.replace("file://", "app://");
        return iosPath;
    }
    return file.nativePath;
}

var drupalServices = require("drupalServices"), APP = require("core"), processed = false, medias = APP.media;

if ("iPhone" === Ti.Platform.osname || "iPad" === Ti.Platform.osname) var ios = true;

var uploadFile = function(media, contribution) {
    "use strict";
    if (Titanium.Network.online && !processed) {
        processed = true;
        drupalServices.createNodeContribution(contribution, function(data) {
            Titanium.API.fireEvent("startUpload");
            var node = {
                "files[video]": media,
                field_name: "field_contribution_video"
            };
            drupalServices.attachFile(node, data.nid, function() {
                var model = medias.shift();
                model.destroy();
                processed = false;
                processUpload();
                0 === medias.length && Titanium.API.fireEvent("uploadFinish");
            }, function() {
                processed = false;
                processUpload();
            }, "", function(json) {
                Titanium.API.fireEvent("uploadInProgress", json);
            });
        }, function() {
            alert("There was an error, try again.");
        });
    }
};

var addFile = function(media, gid, date, uid) {
    "use strict";
    var file, model;
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
    model = Alloy.createModel("media", {
        node: JSON.stringify(contribution.node),
        file: contribution.mediaElement
    });
    medias.add(model);
    model.save();
    processUpload();
};

var processUpload = function() {
    "use strict";
    if (Titanium.Network.online && (APP.Network.type == APP.sendConnection || "3G" == APP.sendConnection)) {
        medias.fetch();
        if (0 === medias.length) return Ti.API.info("No video need to be upload");
        var contributions = medias.toJSON();
        var contribution = contributions.shift(), file = Ti.Filesystem.getFile(contribution.file);
        contribution && uploadFile(file.read(), JSON.parse(contribution.node));
    }
};

exports.addFile = addFile;

exports.processUpload = processUpload;