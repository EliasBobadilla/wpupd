const log = require('log4js')
const os = require('os')
const path = require('path')

const wpupd = require('./src/wpupd')

log.configure({
  appenders: {
    file: {
      type: 'file',
      filename: path.join(os.homedir(), '.config', 'wpupd', 'wpupd.log')
    },
    console: { type: 'console' }
  },
  categories: { default: { appenders: ['file', 'console'], level: 'ALL' } }
})

const logger = log.getLogger('default')

async function init () {
  try {
    const image = await wpupd()
    logger.info(`(^‿^)  ${image} was set as wallpaper`)
  } catch (error) {
    logger.error(error.message)
  }
}

if (process.env.NODE_ENV === 'Development') init().then()

module.exports = init
