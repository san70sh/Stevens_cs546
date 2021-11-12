const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings.json');
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;
let dbObj = {};

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _connection.db(mongoConfig.database);

    dbObj["_db"] = _db;
    dbObj["_connection"] = _connection;
  }

  return dbObj;
};