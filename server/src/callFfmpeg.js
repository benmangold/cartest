const { spawn } = require('child_process');

const { FFMPEG_PATH } = require('../config')

module.exports.callFfmpeg = command => {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(FFMPEG_PATH, command);
    ffmpeg.stdout.on('data', data => console.log(`stdout: ${data}`));
    ffmpeg.stderr.on('data', data => console.error(`stderr: ${data}`));
    ffmpeg.on('close', code => resolve(code));
  });
};
