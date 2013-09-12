exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		  "name": "TEXT",
		  "uid": "INTEGER",
		  "field_avatar": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "recent",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
}

