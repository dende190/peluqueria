const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://peluqueria-shard-00-00-mobsg.mongodb.net:27017,peluqueria-shard-00-01-mobsg.mongodb.net:27017,peluqueria-shard-00-02-mobsg.mongodb.net:27017/test?replicaSet=peluqueria-shard-0';

// Database Name
const dbName = 'peluqueria';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});


// mongodb://peluqueria-mobsg.mongodb.net/test"     --username desarrollo