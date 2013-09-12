exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            name: "TEXT",
            uid: "INTEGER",
            field_avatar: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "recent",
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

model = Alloy.M("recent", exports.definition, [ function(migration) {
    migration.name = "recent";
    migration.id = "201308121117975";
    migration.up = function(db) {
        db.createTable({
            columns: {
                id: "INTEGER PRIMARY KEY AUTOINCREMENT",
                name: "TEXT",
                uid: "INTEGER",
                field_avatar: "TEXT"
            }
        });
    };
    migration.down = function(db) {
        db.dropTable("recent");
    };
} ]);

collection = Alloy.C("recent", exports.definition, model);

exports.Model = model;

exports.Collection = collection;