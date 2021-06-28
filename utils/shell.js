const { exec } = require('child_process')

/**
 * Método para ejecutar un comando el la terminal
 *
 * @param {string} cmd Comando para ejecutar
 * @returns {Promise<any>} Resultado del comando
 */
function shell(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        return reject(error)
      }
      return resolve(stdout)
    })
  })
}

module.exports = shell
