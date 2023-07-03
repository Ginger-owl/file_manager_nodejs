import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const getEol = () => {
  return EOL
}

export const getArch = () => {
  return JSON.stringify(arch(), null, 2)
}

export const getCpus = () => {
  return JSON.stringify(cpus(), null, 2)
}

export const getHomedir = () => {
  return homedir()
}

export const getUsername = () => {
  return userInfo().username
}

export const osController = (params) => {
  let output = `Invalid argument!`
  if (params.length === 1) {
    output = `Invalid argument!`
    const paramName = params[0]
    switch (paramName) {
      case '--EOL':
        output = getEol()
        break
      case '--cpus':
        output = getCpus()
        break
      case '--homedir':
        output = getHomedir()
        break
      case '--username':
        output = getUsername()
        break
      case '--architecture':
        output = getArch()
        break
    }
  }
  console.log(output)
}
