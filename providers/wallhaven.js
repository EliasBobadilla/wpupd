const fetch = require('node-fetch')

class Wallhaven {
  constructor({
    resolution = [1600, 900],
    ratios = [16, 9],
    sfw = false,
    topic = 'anime',
    color = '000000',
  }) {
    this.url = 'https://wallhaven.cc/api/v1/search?q='
    this.atleast = `${resolution[0]}x${resolution[1]}`
    this.ratios = `${ratios[0]}x${ratios[1]}`
    this.purity = sfw ? '100' : '000'
    this.topic = topic
    this.color = color
  }

  async getWallpaper() {
    const result = await fetch(
      `${this.url}${this.topic}&purity=${this.purity}&atleast=${this.atleast}&ratios=${this.ratios}&sorting=random&colors=${this.color}`
    )
    const { data } = await result.json()
    const random = Math.floor(Math.random() * data.length)
    return data[random].path
  }
}

module.exports = Wallhaven
