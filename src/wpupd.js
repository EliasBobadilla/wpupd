const Wallhaven = require('./providers/wallhaven')
const { getConfig, getImage } = require('./utils/files')
const { run } = require('./utils/shell')

async function wpupd () {
  const config = await getConfig()
  const provider = new Wallhaven(config.misc)
  const image = await getImage(await provider.getWallpaper(), config.local)
  await run(config.system, image)
  return image
}

module.exports = wpupd
