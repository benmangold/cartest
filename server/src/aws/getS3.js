const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('../../aws.secret');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

s3.age = 0;

module.exports.getS3 = () => {
  s3.age++;
  console.log('s3 class age ' + s3.age)
  return s3;
};
