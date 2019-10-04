const { connectToMongo } = require('./connectToMongo.js');

module.exports.getEncodingJobList = async (data, connection) => {
  connection
    ? console.log('connection found')
    : (connection = await connectToMongo());
  const { client, db } = connection;
  const list = await findAll(db);
  return list;
};

function findAll(db) {
  return new Promise((res, rej) => {
    db.collection('encoding_jobs')
      .find({})
      .toArray(function(err, result) {
        err ? rej(err) : res(result);
        // console.log(result);
      });
  });
}
