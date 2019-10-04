const fs = require('fs');

const path = require('path');

const { getS3 } = require('./getS3')

module.exports.uploadToS3 = filePath => {
  console.log('Uploading to S3 ' + filePath);
  return new Promise((resolve, reject) => {

    const s3 = getS3()

    const params = {
      Bucket: 'encoding-service-storage',
      Body: fs.createReadStream(filePath),
      Key: 'folder/' + Date.now() + '_' + path.basename(filePath),
    };

    s3.upload(params, (err, data) => (err ? reject(err) : resolve(data)));
  });
};
