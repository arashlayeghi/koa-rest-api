const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017";
const DB_NAME = "arash";

module.exports = app => {
  MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true
    })
    .then((client) => {
      const db = client.db(DB_NAME);
      app.people = db.collection("people");
      console.log("Databse connection established!");
    })
    .catch((err) => console.error(err));
};
