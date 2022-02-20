const { describe, before, it } = require('mocha')
const chai = require('chai')
const expect = require('chai').expect
const fs = require('chai-fs')
const { getConfig, getImage, fixWindowsPath, getConfigFile } = require(
  '../utils/files'
)

chai.use(fs)

describe('Validate config values from config.json', () => {
  let config
  const system = ['gnome', 'feh', 'windows']
  const providers = ['wallhaven', 'unsplash']

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

  it('get config file', () => {
    return getConfigFile().then((file) => {
      expect(file).to.be.a.file()
    })
  })
})

describe('Download image file from uri', () => {
  let config
  const uri = 'https://w.wallhaven.cc/full/z8/wallhaven-z8odwg.jpg'
  before('get config', async () => {
    config = await getConfig()
  })

  it('save image in local path', () => {
    return getImage(uri, config.local).then((image) => {
      expect(image).to.be.a.file()
    })
  })
})
