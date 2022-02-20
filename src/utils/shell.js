import { exec } from 'child_process'
import { platform } from 'os'
import { join } from 'path'
import { promisify } from 'util'

const shell = promisify(exec)

/**
 * Get custom command for shell
 * @param {string} system
 * @param {string} path
 */
function getCommand (system, path) {
  switch (system) {
    case 'feh':
      return `feh --bg-fill ${path}`
    case 'windows':
      return `powershell.exe -file ${
        join(__dirname) / 'windows.ps1'
      } "${path}"`
    case 'gnome':
      return `gsettings set org.gnome.desktop.background picture-uri ${path}`
    case 'default':
      throw new Error('Bad Provider!')
  }
}

/**
 * Run a command in shell
 * @param {string} system
 * @param {string} path
 */
export const run = async (system, path) => {
  await shell(getCommand(system, path), {
    shell: platform().includes('win') ? 'powershell.exe' : '/bin/bash'
  })
}
