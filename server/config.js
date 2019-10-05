
// Config selection will be handled via environment variable

// for now only my local mac config

const localDev = {
  FFMPEG_PATH: 'ffmpeg',
  PORT: '3000',
  DB_URI: 'mongodb://host.docker.internal:27017',
  DB_NAME: 'encoding-db',
  SERVER_MAX_UPLOAD: '300mb'
}

const config = localDev

console.log('ci env')
console.log(process.env)

process.env.CI_ENV ? config.DB_URI='mongodb://127.0.0.1:27017' : null

console.log('======Setting Server Config======')
console.log(config)
console.log('=================================')

module.exports = config