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
        return "http://duppp.local/api/events/node" + (this.get('id'));
      },
      parse: function(record) {
        Ti.API.debug("In models/agents#extendModel.parse. Parameter received " + record);
        if (typeof record === 'string') {
          record = JSON.parse(record);
          record.status === "success" && record.data.result_list;
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
        Ti.API.debug(response.status === "success");
        Ti.API.debug(response.data.result_list);
        if (response.status === "success") {
          return response.data.result_list;
        } else {
          return "";
        }
      },
      search: function(options) {
        if (options == null) {
          options = {};
        }
        Ti.API.debug(options);
        Ti.API.debug("In models/agents#extendCollection.search. Parameters received " + options);
        return this.fetch(options);
      }
    });
    return Collection;
  }
};