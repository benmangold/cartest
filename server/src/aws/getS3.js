const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('../../aws.secret');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

module.exports.getS3 = () => {
  return new AWS.S3();
}