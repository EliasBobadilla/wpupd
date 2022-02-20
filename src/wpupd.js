import Wallhaven from './providers/wallhaven.js'
import { getConfig, getImage } from './utils/files.js'
import { run } from './utils/shell.js'

export default async function wpupd () {
  const config = await getConfig()
  const provider = new Wallhaven(config.misc)
  const image = await getImage(await provider.getWallpaper(), config.local)
  await run(config.system, image)
  return image
}
