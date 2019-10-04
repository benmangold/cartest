const fs = require('fs');

const multer = require('multer');

const { uploadToS3 } = require('../aws/uploadToS3');

const { callFfmpeg } = require('../callFfmpeg');

const { createEncodingJobDoc } = require('../db/createEncodingJobDoc');

const { updateEncodingJobDoc } = require('../db/updateEncodingJobDoc');

const upload = multer({ dest: 'uploads/' });

const UPLOADS_PATH = './uploads/';

module.exports.addFormEncodeMp3AudioRoute = app => {
  return app.post(
    '/api/form/encodeMp3Audio',
    upload.single('mediaUpload'),
    async (req, res, next) => {
      try {
        const timestampedFilename = createTimestampedFilename(
          req.file.originalname
        );

        const encodedFilePath = createMp3Filename(
          UPLOADS_PATH + timestampedFilename
        );

        const uploadedFilePath = UPLOADS_PATH + req.file.filename;
        const filePath = UPLOADS_PATH + timestampedFilename;
        await renameFile(uploadedFilePath, filePath)

        const query = { fileUpload: req.file, status: 'INIT' };

        const job = await createEncodingJobDoc(query);

        const jobId = job.ops[0]._id;

        const command = `-i ${filePath} -codec:a libmp3lame -qscale:a 2 ${encodedFilePath}`.split(
          ' '
        );

        await callFfmpeg(command).catch(err => res.end(err));

        await updateEncodingJobDoc(
          { _id: jobId },
          { $set: { status: 'ENCODED' } }
        );

        const uploadData = await uploadToS3(encodedFilePath);

        await updateEncodingJobDoc(
          { _id: jobId },
          { $set: { status: 'UPLOADED', uploadData: uploadData } }
        );

        console.log(`Uploaded! \n${JSON.stringify(uploadData)}`);

        res.download(encodedFilePath);
      } catch (err) {
        console.log(err);
        console.log(`Upload Error \n${JSON.stringify(err)}`);
        res.end(JSON.stringify(err));
      }
    }
  );
};

function renameFile(oldPath, newPath) {
  return new Promise((resolve, reject) =>
    fs.rename(oldPath, newPath, err => (err ? reject(err) : resolve(newPath)))
  );
}

function createTimestampedFilename(filename) {
  const fileNameArray = filename.split('.');
  const filetype = fileNameArray.pop();
  fileNameArray.push(Date.now());
  fileNameArray.push(filetype);
  return fileNameArray.join('.');
}

function createMp3Filename(filename) {
  const fileNameArray = filename.split('.');
  fileNameArray.pop(); // original file extension
  fileNameArray.push('mp3');
  return fileNameArray.join('.');
}
