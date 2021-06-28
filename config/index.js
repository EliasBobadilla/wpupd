const fs = require('fs')

class Config {
  constructor(path) {
    const data = fs.readFileSync(path)
    const json = JSON.parse(data)
    Object.keys(json).forEach((key) => {
      this[key] = json[key]
    })
  }
}

module.exports = Config
