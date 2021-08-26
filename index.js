const log = require('log4js')
const os = require('os')
const wpupd = require('./src/wpupd')

const WPUPD_LOG = '.config/wpupd/wpupd.log'

log.configure({
  appenders: {
    log: {
      type: 'file',
      filename: `${os.homedir()}/${WPUPD_LOG}`
    }
  },
  categories: { default: { appenders: ['log'], level: 'ALL' } }
})

function init () {
  wpupd().then(img => {
    console.log(`${img} was set as wallpaper (^‿^)`)
  }).catch(error => {
    console.error(`${error} (✖╭╮✖)`)
  })
}

module.exports = { init }
