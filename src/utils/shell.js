const { exec } = require('child_process')

function getCommand (system) {
  switch (system) {
    case 'feh':
      return 'feh --bg-fill'
    default:
      return 'gsettings set org.gnome.desktop.background picture-uri'
  }
}

function run (system, path) {
  const cmd = `${getCommand(system)} ${path}`
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        return reject(error)
      }
      return resolve(stdout)
    })
  })
}

module.exports = run
