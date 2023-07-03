import { createInterface } from 'readline/promises'
import { getHomedir, osController } from './os/index.js'
import { up, ls, cd } from './nvd/index.js'
import { calculateHash } from './hash/index.js'
import { compress, decompress } from './zip/index.js'
import { add, cat, cp, mv, rm, rn } from './fs/index.js'

export default class FileManager {
  constructor() {
    this.username = this.getUsername()
    this.currentDirectory = getHomedir()
  }

  getUsername() {
    let username = 'Anonymous';
    const additionalArgs = process.argv.slice(2)
    if (additionalArgs.length > 0) {
      additionalArgs.forEach((value, index) => {
        if (value.startsWith('--username')) {
          username = value.split('=')[1]
        }
      })
    return username
    }
  }

  async cmdController(line) {
    const input = line.trim().split(' ')
    const cmd = input[0]
    const params = input.slice(1)
    switch (cmd) {
      case 'os':
        osController(params)
        break
      case 'up':
        if (params.length === 0) {
          this.currentDirectory = up(this.currentDirectory)
        }
        break
      case 'ls':
        if (params.length === 0) {
          await ls(this.currentDirectory)
        }
        break
      case 'cd':
        if (params.length === 1) {
          this.currentDirectory = await cd(params[0], this.currentDirectory)
        }
        break
      case 'cat':
        if (params.length === 1) {
          await cat(params[0], this.currentDirectory)
        } else {
          console.log('Invalid input!') //TODO: refactor
        }
        break
      case 'cp':
        if (params.length === 2) {
          await cp(params[0], params[1], this.currentDirectory)
        } else {
          console.log('Invalid input!') //TODO: refactor
        }
        break
      case 'mv':
        if (params.length === 2) {
          await mv(params[0], params[1], this.currentDirectory)
        } else {
          console.log('Invalid input!') //TODO: refactor
        }
        break
      case 'rm':
        if (params.length === 1) {
          await rm(params[0], this.currentDirectory)
        } else {
          console.log('Invalid input!') //TODO: refactor
        }
        break
      case 'rn':
        if (params.length === 2) {
          await rn(params[0], params[1], this.currentDirectory)
        } else {
          console.log('Invalid input!') //TODO: refactor
        }
        break
      case 'add':
        if (params.length === 1) {
          await add(params[0], this.currentDirectory)
        } else {
          console.log('Invalid input!') //TODO: refactor
        }
        break
      case 'hash':
        if (params.length === 1) {
          await calculateHash(params[0], this.currentDirectory)
        }
        break
      case 'compress':
        if (params.length === 2) {
          await compress(params[0], params[1], this.currentDirectory)
        }
        break
      case 'decompress':
        if (params.length === 2) {
          await decompress(params[0], params[1], this.currentDirectory)
        }
        break
      case '.exit':
        console.log(`Thank you for using File Manager, ${this.username}, goodbye!`)
        process.exit(0);
      default:
        console.log(`Invalid input!`)
        break
    }
    console.log(`You are currently in ${this.currentDirectory}`)
  }

  init() {
    console.log(`Welcome to the File Manager, ${this.username}!`)
    console.log(`You are currently in ${this.currentDirectory}`)

    const readInterface = createInterface({input: process.stdin, output: process.stdout, prompt: '> '})
    readInterface.on('line', (line) => {
      this.cmdController(line)
    })

    readInterface.on('SIGINT', async () => {
      readInterface.close();
    });
  
    readInterface.on('close', async () => {
      console.log(`Thank you for using File Manager, ${this.username}, goodbye!`)
      process.exit(0);
    });
  }
}


