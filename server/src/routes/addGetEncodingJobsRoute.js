const { getEncodingJobList } = require('../db/getEncodingJobList.js');

module.exports.addGetEncodingJobsRoute = app => {
  return app.get('/api/encodingJobs', async (req, res) => {
    const list = await getEncodingJobList();
    res.end(JSON.stringify(list));
  });
};
