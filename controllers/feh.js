const shell = require('../utils/shell')

class Feh {
  constructor() {
    this.command = 'feh --bg-fill'
  }

  /**
   * Método para configurar una imagen como wallpaper en gnome
   *
   * @param {string} path
   */
  async set(path) {
    await shell(`${this.command} ${path}`)
  }
}

module.exports = Feh
