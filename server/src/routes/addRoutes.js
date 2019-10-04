const { addApiVersionRoute } = require('./addApiVersionRoute');

const { addGetEncodingJobsRoute } = require('./addGetEncodingJobsRoute');

const { addFormEncodeMp3AudioRoute } = require('./addFormEncodeMp3AudioRoute');

const { addGetAudioListRoute } = require('./addGetAudioListRoute')

const bodyParser = require('body-parser');

const { SERVER_MAX_UPLOAD } = require('../../config')

const rawBodyParser = bodyParser.raw({ type: '*/*', limit: SERVER_MAX_UPLOAD });

const { getEncodingJobList } = require('../db/getEncodingJobList.js');

/**
 * Add all route definitions to an express server
 */
module.exports.addRoutes = app => {
  //
  // GET /api/version - returns api version as JSON
  app = addApiVersionRoute(app);
  //
  // GET /api/encodingJobs - returns encoding jobs as JSON
  app = addGetEncodingJobsRoute(app);
  //
  // GET /api/audioLinks - returns encoded audio links as JSON
  app = addGetAudioListRoute(app)
  //
  // POST /api/form/encodeMp3Audio - Encode audio as multipart form data
  app = addFormEncodeMp3AudioRoute(app);
  //
  // POST /api/blob/encodeMp3Audio - Encode audio as a blob
  app = addBlobEncodeMp3AudioRoute(app);
  //
  // wildcard debugging route for dev
  app.post('*', (req, res) => {
    console.log('hi wildcard post');
    console.log(req.method);
    console.log(req.url);
    console.log(JSON.stringify(req.headers));
    res.send('post err ' + Object.keys(req));
  });

  return app;
};

// TODO
function addBlobEncodeMp3AudioRoute(app) {
  app.post('blob/encodeMp3Audio', rawBodyParser, function(req, res) {
    console.log(JSON.stringify(req));
    // file at req.body
  });
  return app;
}
