const { getEncodingJobList } = require('../db/getEncodingJobList.js');

const { getS3 } = require('../aws/getS3');

const s3 = getS3();

module.exports.addGetAudioListRoute = app => {
  return app.get('/api/audioLinks', async (req, res) => {
    const list = await getEncodingJobList();

    const links = list
      .map(item =>
        item['uploadData']
          ? s3.getSignedUrl('getObject', {
              Bucket: item['uploadData']['Bucket'],
              Key: item['uploadData']['Key'],
            })
          : null
      )
      .filter(item => item != null);

    res.end(JSON.stringify(links));
  });
};
