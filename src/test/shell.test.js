const path = require('path')
const { describe, before, it } = require('mocha')
const expect = require('chai').expect
const { getConfig } = require('../utils/files')
const { run, getCommand } = require('../utils/shell')

describe('Shell process', () => {
  let config
  let testPath
  before('get config', async () => {
    config = await getConfig()
    testPath = path.join(__dirname, 'assets', 'test.png')
  })

  it('get command for shell', () => {
    const command = getCommand(config.system, 'Test')
    expect(command).to.not.have.lengthOf(0)
    expect(command).to.match(/(?:feh|rundll32|gnome)/)
  })

  it('set test wallpaper', () => {
    return run(config.system, testPath).then(result => {
      const { stderr } = result
      expect(stderr).to.have.lengthOf(0)
    })
  })
})
