const shell = require('util').promisify(require('child_process').exec)
const os = require('os')

/**
 * Method to get custom command for shell
 * @param {string} system
 * @param {string} path
 * @returns {string} command for shell
 */
function getCommand (system, path) {
  switch (system) {
    case 'feh':
      return `feh --bg-fill ${path}`
    case 'windows':
      return `reg add "HKEY_CURRENT_USER\\Control Panel\\Desktop" /v Wallpaper /t REG_SZ /d /f ${path};Start-Sleep -s 10; rundll32.exe user32.dll, UpdatePerUserSystemParameters, 0, $false`
    case 'gnome':
      return `gsettings set org.gnome.desktop.background picture-uri ${path}`
    case 'default':
      throw new Error('Bad Provider!')
  }
}

/**
 * Method to run a command in shell
 * @param {string} system
 * @param {string} path
 * @returns {Promise<string>}
 */
const run = (system, path) =>
  shell(getCommand(system, path), {
    shell: os.platform().includes('win') ? 'powershell.exe' : '/bin/bash'
  })

module.exports = run
