const log = require('log4js')
const Wallhaven = require('./providers/wallhaven')
const { getConfig, getImage } = require('./utils/files')
const run = require('./utils/shell')

const logger = log.getLogger('default')

async function wpupd () {
  try {
    const config = await getConfig()
    const provider = new Wallhaven(config.misc)
    const url = await provider.getWallpaper()
    const image = await getImage(url, config.local)
    await run(config.system, image)
    return image
  } catch (error) {
    logger.error(error)
    return error.message
  }
}

module.exports = wpupd
