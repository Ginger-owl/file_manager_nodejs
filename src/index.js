import { getHomedir, osController } from './os/index.js'
import { up, ls, cd } from './nvd/index.js'
import { calculateHash } from './hash/index.js'
import { createInterface } from 'readline/promises'

class FileManager {
  constructor() {
    this.username = this.getUsername()
    this.currentDirectory = getHomedir()
  }

  getUsername() {
    let username = 'Anonymous';
    const additionalArgs = process.argv.slice(2)
    if (additionalArgs.length > 0) {
      additionalArgs.forEach((value, index) => {
        if (value === '--username') {
          username = additionalArgs[index + 1]
        }
      })
    return username
    }
  }

/*   cmdParser(input) {
    
  } */

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
          break
        }
      case 'ls':
        if (params.length === 0) {
          await ls(this.currentDirectory)
          break
        }
      case 'cd':
        if (params.length === 1) {
            this.currentDirectory = await cd(params[0], this.currentDirectory)
            break;
          }
      case 'hash':
        if (params.length === 1) {
          await calculateHash(params[0], this.currentDirectory)
          break;
        }
      default:
        process.stdout.write(`Received command: ${input}\n`)
        process.stdout.write(`Invalid input!\n`)
        break
    }
    process.stdout.write(`You are currently in ${this.currentDirectory}\n`)
  }

  init() {
    process.stdout.write(`Welcome to the File Manager, ${this.username}!\n`)
    process.stdout.write(`You are currently in ${this.currentDirectory}\n`)

    const readInterface = createInterface({input: process.stdin, output: process.stdout, prompt: '> '})
    readInterface.on('line', (line) => {
      this.cmdController(line)
    })
  }
}

const fm = new FileManager()
fm.init()
