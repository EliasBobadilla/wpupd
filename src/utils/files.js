const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const os = require('os')

/**
 * Method to fix Windows path with double \
 *
 * @param {string} path
 * @returns {string} Fixed path for Windows
 */
function fixWindowsPath (path) {
  return path.replace(/\\/g, '\\\\')
}

/**
 * Method to create default config file
 * @param {string} configPath
 * @returns {Promise<void>}
 */
function createConfig (configPath) {
  const downloadPath = path.join(os.homedir(), 'Downloads')
  const isWindows = os.platform().includes('win')

  const defaultConfig = `
{
  "local": "${isWindows ? fixWindowsPath(downloadPath) : downloadPath}",
  "system": "${isWindows ? 'windows' : 'gnome'}",
  "provider": "wallhaven",
  "misc": {
    "resolution": [1600, 900],
    "ratios": [16, 9],
    "topic": "code geass",
    "sfw": true,
    "color": "#FFA500"
  }
}
  `

  return fs.promises.writeFile(configPath, defaultConfig)
}

/**
 * Method to get config info as json
 * @returns {Promise<object>}
 */
async function getConfig () {
  const configFilePath = path.join(
    os.homedir(),
    '.config',
    'wpupd',
    'config.json'
  )

  if (!fs.existsSync(configFilePath)) {
    await createConfig(configFilePath)
  }

  const config = await fs.promises.readFile(configFilePath, 'utf8')
  const json = JSON.parse(config)
  const { local, system, provider } = json
  if (!local || !system || !provider) { throw new Error(`The config file is wrong, check ${configFilePath}`) }
  return json
}

/**
 * Method to download one image from url and save it in local path
 * @param {string} url image uri
 * @param {string} local local path
 * @returns {Promise<string>} image path
 */
async function getImage (url, local) {
  const filePath = path.join(local, path.basename(url))
  await fs.promises.writeFile(filePath, await (await fetch(url)).buffer())
  return filePath
}

module.exports = { getConfig, getImage }
