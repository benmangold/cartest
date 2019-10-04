const { PORT } = require('./config');

const { createServer } = require('./src/createServer.js');

createServer().listen(PORT, '0.0.0.0', () =>
  console.log(`encoding application server listening on port ${ PORT }!`)
);
