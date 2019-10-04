const { connectToMongo } = require('./connectToMongo');

module.exports.updateEncodingJobDoc = async (id, data, connection) => {
  console.log('updating');
  try {
    const updated = await update(id, data, connection);
    console.log('updated ' + JSON.stringify(updated));
    return updated;
  } catch (err) {
    throw err;
  }
};

function update(selector, query, connection) {
  return new Promise(async (res, rej) => {
    try {
      console.log('connection ' + connection);
      connection
        ? console.log('connection found')
        : (connection = await connectToMongo());
      const { client, db } = await connection;
      console.log('connected');
      db.collection('encoding_jobs').updateOne(selector, query, (err, data) => {
        client.close();
        err ? rej(err) : res(data);
      });
    } catch (err) {
      console.log('update err');
      console.log(JSON.stringify(err));
      rej(err);
    }
  });
}
