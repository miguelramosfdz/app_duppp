exports.definition = {
    config: {
        adapter: {
            type: "restapi",
            name: "event"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            url: function() {
                return "http://duppp.local/api/events/node" + this.get("id");
            },
            parse: function(record) {
                Ti.API.debug("In models/agents#extendModel.parse. Parameter received " + record);
                if ("string" == typeof record) {
                    record = JSON.parse(record);
                    "success" === record.status && record.data.result_list;
                    record = record.data.result_list[0];
                }
                return record;
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            url: function() {
                return "http://duppp.local/api/events/node";
            },
            parse: function(response) {
                Ti.API.debug("In models/agents#extendCollection.parse. Parameter received " + response);
                response = JSON.parse(response);
                Ti.API.debug("success" === response.status);
                Ti.API.debug(response.data.result_list);
                return "success" === response.status ? response.data.result_list : "";
            },
            search: function(options) {
                null == options && (options = {});
                Ti.API.debug(options);
                Ti.API.debug("In models/agents#extendCollection.search. Parameters received " + options);
                return this.fetch(options);
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("event", exports.definition, []);

collection = Alloy.C("event", exports.definition, model);

exports.Model = model;

exports.Collection = collection;