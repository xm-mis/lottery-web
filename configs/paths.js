const {resolve} = require('path')


// 明确一下当前应用所在的根路径


const appDir = process.cwd() // cwd指的是应用目录的根



module.exports = (resolvePath) =>{
    return resolve(appDir, resolvePath)
}