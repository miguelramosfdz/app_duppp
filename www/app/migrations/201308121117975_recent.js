migration.up = function (db) {
  db.createTable({
    "columns": {
      "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
      "name": "TEXT",
      "uid": "INTEGER",
      "field_avatar": "TEXT"
    }
  });
};

migration.down = function (db) {
  db.dropTable("recent");
};
