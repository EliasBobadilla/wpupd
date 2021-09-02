const log = require('log4js')
const os = require('os')
const path = require('path')

const wpupd = require('./src/wpupd')

log.configure({
  appenders: {
    log: {
      type: 'file',
      filename: path.join(os.homedir(), '.config', 'wpupd', 'wpupd.log')
    }
  },
  categories: { default: { appenders: ['log'], level: 'ALL' } }
})

async function init () {
  try {
    console.log(`${await wpupd()} was set as wallpaper (^‿^)`)
  } catch (err) {
    console.error(`${err} (✖╭╮✖)`)
  }
}

module.exports = init
