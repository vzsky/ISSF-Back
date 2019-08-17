const fs = require('fs')
let now = new Date()

module.exports = async function (str){
    fs.appendFile('log.txt', now.toString().slice(0,-25) + str + '\r\n', function (err) {
        if (err) throw err
      })
}
