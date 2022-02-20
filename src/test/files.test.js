import { describe, before, it } from 'mocha'
import { use, expect } from 'chai'

import fs from 'chai-fs'

import {
  getConfig,
  getImage,
  fixWindowsPath,
  getConfigFile
} from '../utils/files.js'

use(fs)

describe('Validate config values from config.json', () => {
  let config

  const system = ['gnome', 'feh', 'windows'], providers = ['wallhaven', 'unsplash']

  before('get config', async () => {
    config = await getConfig()
  })

  it('local, system and provider props are required', () => {
    expect(config.local).to.not.have.lengthOf(0)
    expect(config.system).to.not.have.lengthOf(0)
    expect(config.provider).to.not.have.lengthOf(0)
  })

  it('system and provider props must be one of this', () => {
    expect(system).to.include(config.system)
    expect(providers).to.include(config.provider)
  })

  it('fix path for windows', () => {
    const fixedPath = fixWindowsPath('c:\\demo\\path')
    expect(fixedPath).to.match(/(\\)/)
  })

  it('get config file', () => getConfigFile().then((file) => {
      expect(file).to.be.a.file()
    })
  )
})

describe('Download image file from uri', () => {
  let config

  const uri = 'https://w.wallhaven.cc/full/z8/wallhaven-z8odwg.jpg'
  
  before('get config', async () => {
    config = await getConfig()
  })

  it('save image in local path', () => getImage(uri, config.local).then((image) => {
      expect(image).to.be.a.file()
    })
  )
})
