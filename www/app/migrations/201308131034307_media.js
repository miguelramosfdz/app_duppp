migration.up = function (db) {
  db.createTable({
    "columns": {
      "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
      "node": "TEXT",
      "file": "TEXT"
    }
  });
};

migration.down = function (db) {
  db.dropTable("media");
};
