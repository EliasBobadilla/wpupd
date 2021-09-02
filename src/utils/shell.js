const shell = require('util').promisify(require('child_process').exec)

function getCommand (system) {
  switch (system) {
    case 'feh':
      return 'feh --bg-fill'
    case 'windows':
      console.log('Support for Windows is a WIP.')
      process.exit(0)
    default:
      return 'gsettings set org.gnome.desktop.background picture-uri'
  }
}

const run = (system, path) => shell(`${getCommand(system)} ${path}`)

module.exports = run
