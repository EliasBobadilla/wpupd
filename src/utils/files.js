const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const os = require('os')

const WPUPD_CONFIG = '.config/wpupd/config.json'

function getPath (url, local) {
  return path.join(local, path.basename(url))
}

async function createConfig () {

}

async function getConfig () {
  const configFile = `${os.homedir()}/${WPUPD_CONFIG}`
  if (!fs.existsSync(configFile)) { await createConfig() }

  const config = await fs.promises.readFile(configFile, 'utf8')
  const json = JSON.parse(config)
  const { local, system, provider } = json
  if (!local || !system || !provider) throw new Error(`The config file is wrong, check ${configFile}`)
  return json
}

async function getImage (url, local) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  const filePath = getPath(url, local)
  await fs.promises.writeFile(filePath, buffer)
  return filePath
}

module.exports = { getConfig, getImage }
