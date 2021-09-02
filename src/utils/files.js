const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const os = require('os')

/**
 * @param {string} path
 * @returns {string} The Windosifyed path
 */
function windosifyPath (path) {
  return path.replace(/\\/g, '\\\\')
}

function createConfig (configPath) {
  const whereToDowload = path.join(os.homedir(), 'Downloads')
  const isWindows = os.platform().includes('win')

  const defaultConfig = `
{
  "local": "${isWindows ? windosifyPath(whereToDowload) : whereToDowload}",
  "system": "${isWindows ? 'windows' : 'gnome'}",
  "provider": "wallhaven",
  "misc": {
    "resolution": [1600, 900],
    "ratios": [16, 9],
    "topic": "code geass",
    "sfw": true
  }
}
  `

  fs.promises.writeFile(configPath, defaultConfig)
}

async function getConfig () {
  const configFilePath = path.join(
    os.homedir(),
    '.config',
    'wpupd',
    'config.json'
  )

  if (!fs.existsSync(configFilePath)) {
    createConfig(configFilePath)
  }

  const config = await fs.promises.readFile(configFilePath, 'utf8')
  const json = JSON.parse(config)
  const { local, system, provider } = json
  if (!local || !system || !provider) {
    throw new Error(`The config file is wrong, check ${configFilePath}`)
  }
  return json
}

async function getImage (url, local) {
  const filePath = path.join(local, path.basename(url))
  await fs.promises.writeFile(filePath, await (await fetch(url)).buffer())
  return filePath
}

module.exports = { getConfig, getImage }
