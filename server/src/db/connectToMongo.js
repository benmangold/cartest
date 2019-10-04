const MongoClient = require('mongodb').MongoClient;

const { DB_NAME, DB_URI } = require('../../config')

const CLIENT_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

/*
  Use like:
  const { client, db } = await connectToMongo()
*/
module.exports.connectToMongo = (dbName = DB_NAME, uri = DB_URI) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await new MongoClient.connect(uri, CLIENT_CONFIG);
      const db = await client.db(dbName);
      const output = {
        client: client,
        db: db,
      };
      resolve(output);
    } catch (err) {
      reject(err);
    }
  });
};
