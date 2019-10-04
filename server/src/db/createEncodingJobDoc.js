const { connectToMongo } = require('./connectToMongo');

module.exports.createEncodingJobDoc = async (data, connection) => {
  try {
    console.log('connection ' + connection);
    connection
      ? console.log('connection found')
      : (connection = await connectToMongo());
    const { client, db } = connection;
    const created = await db.collection('encoding_jobs').insertOne(data);
    client.close();
    return created;
  } catch (err) {
    throw err;
  }
};
