import { getHomedir, osController } from './os/index.js'
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

  cmdController(line) {
    const input = line.trim().split(' ')
    const cmd = input[0]
    const params = input.slice(1)
    switch (cmd) {
      case 'os':
        let output = osController(params)
        process.stdout.write(`${output}\n`)
        break
      default:
        process.stdout.write(`Received command: ${input}\n`)
        break
    }

  }

  init() {
    process.stdout.write(`Welcome to the File Manager, ${this.username}!\n`)
    process.stdout.write(`You are currently in ${this.currentDirectory}\n`)

    const readInterface = createInterface({input: process.stdin, output: process.stdout})
    readInterface.on('line', (line) => {
      this.cmdController(line)
    })
  }
}

const fm = new FileManager()
fm.init()
