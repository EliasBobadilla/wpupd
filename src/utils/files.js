import { join, basename } from 'path'
import { existsSync, promises } from 'fs'
import { homedir, platform } from 'os'

import fetch from 'node-fetch'

/**
 * Fix Windows path with double "\"
 * @param {string} path
 * @returns Fixed path for Windows
 */
export function fixWindowsPath (path) {
  return path.replace(/\\/g, '\\\\')
}

/**
 * Create default config file
 */
export async function getConfigFile () {
  const filePath = join(homedir(), '.config', 'wpupd', 'config.json')

  if (existsSync(filePath)) return filePath

  const downloadPath = join(homedir(), 'Downloads')

  const isWindows = platform().includes('win')

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

  await promises.writeFile(filePath, defaultConfig)

  return filePath
}

/**
 * Get config info as JSON
 */
export async function getConfig () {
  const configFilePath = await getConfigFile()

  const config = await promises.readFile(configFilePath, 'utf8')

  const json = JSON.parse(config)

  const { local, system, provider } = json

  if (!local || !system || !provider) {
    throw new Error(`Invalid config file, check ${configFilePath}`)
  }

  return json
}

/**
 * Download an image from URL and save it
 * @param {string} url image URI
 * @param {string} local Path
 */
export async function getImage (url, local) {
  const filePath = join(local, basename(url))

  const response = await fetch(url)

  const contentType = response.headers.get('Content-Type')

  if (!contentType.includes('image')) {
    throw new Error(`Error downloading file from ${url}`)
  }

  const data = await response.buffer()

  await promises.writeFile(filePath, data)

  return filePath
}
