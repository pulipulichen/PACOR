var fs = require('fs')

const crypto = require('crypto');
let id = crypto.randomBytes(20).toString('hex');

if (fs.existsSync('./.env') === false 
        && fs.existsSync('./.env.example')) {
  let env = fs.readFileSync('./.env.example').toString()
  env = env.replace('\nAPP_KEY=\n', `\nAPP_KEY=${id}\n`)
  fs.writeFileSync('./.env', env)
}

if (fs.existsSync('./.env.https') === false 
        && fs.existsSync('./.env.https.example')) {
  let env = fs.readFileSync('./.env.https.example').toString()
  env = env.replace('\nAPP_KEY=\n', `\nAPP_KEY=${id}\n`)
  fs.writeFileSync('./.env.https', env)
}

// ----------------------------------
// install global packages

const {globalDependencies} = require('./package.json')

let packages = []
for (let name in globalDependencies) {
  let p = name
  let v = globalDependencies[p]
  if (v.startsWith('^') === false) {
    p = p + '@' + v
  }
  
  packages.push(p)
}
let globalInstallCommant = `npm i -g ${packages.join(' ')}`

const exec = require('child_process').exec;
exec(globalInstallCommant, () => {})