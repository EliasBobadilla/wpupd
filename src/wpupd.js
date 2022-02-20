import Wallhaven from './providers/wallhaven.js'
import { getConfig, getImage } from './utils/files.js'
import { run } from './utils/shell.js'

import untildify from 'untildify'

export default async function wpupd () {
  const config = await getConfig()

  const provider = new Wallhaven(config.misc)

  const wallpaper = await provider.getWallpaper()

  const image = await getImage(wallpaper, untildify(config.local))

  await run(config.system, image)

  return image
}
