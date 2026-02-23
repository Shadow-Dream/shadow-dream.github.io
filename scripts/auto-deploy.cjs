const { execSync } = require('child_process')

function run(command) {
  execSync(command, { stdio: 'inherit' })
}

function output(command) {
  return execSync(command, { encoding: 'utf8' }).trim()
}

run('git add -A')

const status = output('git status --porcelain')
if (!status) {
  console.log('No changes to commit. Skipping push.')
  process.exit(0)
}

const stamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
const message = `chore: deploy ${stamp} UTC`

run(`git commit -m "${message}"`)
run('git push')
