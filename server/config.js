
// Config selection will be handled via environment variable

// for now only my local mac config

const localDev = {
  FFMPEG_PATH: 'ffmpeg',
  PORT: '3000',
  DB_URI: 'mongodb://host.docker.internal:27017',
  DB_NAME: 'encoding-db',
  SERVER_MAX_UPLOAD: '300mb'
}

module.exports = localDev
