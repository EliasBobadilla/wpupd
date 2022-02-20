import { existsSync } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import untildify from 'untildify'

import { getConfig, getImage } from './utils/files.js'
import { run } from './utils/shell.js'

function getProvider (provider) {
  const path = `${dirname(
    fileURLToPath(import.meta.url)
  )}/providers/${provider}.js`

  if (!existsSync(path)) {
    throw new Error(`Provider "${provider}" not found!`)
  }

  return import(path)
}

export default async function wpupd () {
  const config = await getConfig()

  const { default: ProviderBuilder } = await getProvider(config.provider)

  const provider = new ProviderBuilder(config.misc)

  const wallpaper = await provider.getWallpaper()

  const image = await getImage(wallpaper, untildify(config.local))

  await run(config.system, image)

  return image
}
