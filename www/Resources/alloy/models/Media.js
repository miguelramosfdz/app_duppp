exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            node: "TEXT",
            file: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "media",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("media", exports.definition, [ function(migration) {
    migration.name = "media";
    migration.id = "201308131034307";
    migration.up = function(db) {
        db.createTable({
            columns: {
                id: "INTEGER PRIMARY KEY AUTOINCREMENT",
                node: "TEXT",
                file: "TEXT"
            }
        });
    };
    migration.down = function(db) {
        db.dropTable("media");
    };
} ]);

collection = Alloy.C("media", exports.definition, model);

exports.Model = model;

exports.Collection = collection;