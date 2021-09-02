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
 * @returns {Promise<string>}
 */
async function getConfigFile () {
  const filePath = path.join(
    os.homedir(),
    '.config',
    'wpupd',
    'config.json'
  )

  if (fs.existsSync(filePath)) return filePath

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

  await fs.promises.writeFile(filePath, defaultConfig)
  return filePath
}

/**
 * Method to get config info as json
 * @returns {Promise<object>}
 */
async function getConfig () {
  const configFilePath = await getConfigFile()
  const config = await fs.promises.readFile(configFilePath, 'utf8')
  const json = JSON.parse(config)
  const { local, system, provider } = json
  if (!local || !system || !provider) { throw new Error(`Invalid config file, check ${configFilePath}`) }
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
  const response = await fetch(url)
  const contentType = response.headers.get('Content-Type')
  if (!contentType.includes('image')) throw new Error(`Error downloading file from ${url}`)
  await fs.promises.writeFile(filePath, await response.buffer())
  return filePath
}

module.exports = { getConfig, getImage, fixWindowsPath, getConfigFile }
