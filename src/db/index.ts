import sqlite3 from "sqlite3";

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
   // ssssssssssssss
});

db.close();