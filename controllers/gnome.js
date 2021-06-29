const shell = require('../utils/shell')

class Gnome {
  constructor() {
    this.command = 'gsettings set org.gnome.desktop.background picture-uri'
  }

  async set(path) {
    await shell(`${this.command} ${path}`)
  }
}

module.exports = Gnome
