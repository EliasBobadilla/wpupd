const fetch = require('node-fetch')

class Wallhaven {
  constructor(props) {
    this.url = 'https://wallhaven.cc/api/v1/search?q='

    this.atleast =
      props.resolution &&
      Array.isArray(props.resolution) &&
      props.resolution.length === 2
        ? `${props.resolution[0]}x${props.resolution[1]}`
        : '1600x900'

    this.ratios =
      props.ratios && Array.isArray(props.ratios) && props.ratios.length === 2
        ? `${props.ratios[0]}x${props.ratios[1]}`
        : '16x9'

    this.purity = props.sfw ? '100' : '000'

    this.topic = props.topic || 'anime'
  }

  /**
   * Método para obtener un wallpaper al azar
   *
   * @returns {Promise<string>} Url del wallpaper
   */
  async getWallpaper() {
    const result = await fetch(
      `${this.url}${this.topic}&purity=${this.purity}&atleast=${this.atleast}&ratios=${this.ratios}&sorting=random`
    )
    const { data } = await result.json()
    const random = Math.floor(Math.random() * data.length)
    return data[random].path
  }
}

module.exports = Wallhaven
