const { getEncodingJobList } = require('../db/getEncodingJobList.js');

const { getS3 } = require('../aws/getS3')

const s3 = getS3();

module.exports.addGetAudioListRoute = app => {
  return app.get('/api/audioLinks', async (req, res) => {
    const list = await getEncodingJobList();

    const links = list.map(item => {

      if (item['uploadData']) {
        const params = { 'Bucket':item['uploadData']['Bucket'], 'Key': item['uploadData']['Key']};
        const url = s3.getSignedUrl('getObject', params);  
        return url
      } 
    })

    const filtered = links.filter(el => el != null);

    res.end(JSON.stringify(filtered));
  });
}
