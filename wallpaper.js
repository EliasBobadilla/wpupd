const log = require('log4js')
const os = require('os')
const Wallhaven = require('./providers/wallhaven')
const Gnome = require('./controllers/gnome')
const Config = require('./config')
const { download, getName } = require('./utils/image')

const WPUPD_LOG = '.config/wpupd/wpupd.log'
const WPUPD_CONFIG = '.config/wpupd/config.json'

log.configure({
  appenders: {
    log: {
      type: 'file',
      filename: `${os.homedir()}/${WPUPD_LOG}`,
    },
  },
  categories: { default: { appenders: ['log'], level: 'ALL' } },
})

const logger = log.getLogger('default')

class Wallpaper {
  constructor() {
    try {
      this.config = new Config(`${os.homedir()}/${WPUPD_CONFIG}`)
      const { local, system, provider, misc } = this.config
      if (!local || !system || !provider) {
        throw new Error(`You should configure "${WPUPD_CONFIG}" properly`)
      }
      this.provider = new Wallhaven(misc)
      this.controller = new Gnome(misc)
    } catch (error) {
      logger.error(error)
    }
  }

  async set() {
    try {
      const image = await this.provider.getWallpaper()
      const path = `${this.config.local}/${getName(image)}`
      await download(image, path)
      await this.controller.set(path)
      logger.info(`${path} was set as wallpaper successfully`)
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = Wallpaper
