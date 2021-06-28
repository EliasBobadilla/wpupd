const fetch = require('node-fetch')
const fs = require('fs')

/**
 * Método para descargar una imagen desde una url
 *
 * @param {string} url Url del imagen
 * @param {string} path Path donde se guardará la imagen
 */
async function download(url, path) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  await fs.writeFileSync(path, buffer)
}

/**
 * Método para obtener el nombre de una imagen desde una url
 *
 * @param {string} url Url de la imagen
 * @returns {string} Nombre del archivo con extensión
 */
function getName(url) {
  const splitted = url.split('/')
  return splitted[splitted.length - 1]
}

module.exports = { download, getName }
