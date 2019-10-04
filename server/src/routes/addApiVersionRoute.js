module.exports.addApiVersionRoute = app => {
  return app.get('/api/version', (req, res) =>
    res.end('{"encoding server": "v0.0.0"}')
  );
};
