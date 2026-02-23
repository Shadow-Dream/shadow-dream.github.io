const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const assetsDir = path.join(root, 'assets')
const indexFile = path.join(root, 'index.html')

function remove(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true })
  }
}

remove(assetsDir)
remove(indexFile)
