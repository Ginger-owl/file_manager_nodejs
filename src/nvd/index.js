import { access, readdir, stat } from 'fs/promises'
import { resolve } from 'path'

export const up = (currentDir) => {
  console.log(`Received directory ${currentDir}`)
  const parentDir = resolve(currentDir, '..')
  console.log(`Parent directory ${parentDir}`)
  return parentDir
}

export const ls = async (currentDir) => {
  try {
    const fileList = await readdir(currentDir, { withFileTypes: true });
    const filesTable = fileList
      .map((file, index) => ({
        index: index + 1,
        name: file.name,
        type: file.isDirectory() ? 'directory' : `file`,
        
      }))
      .sort((a, b) => {
        // sort by type, if equal -> by name
        return a.type < b.type
          ? -1
          : a.type > b.type
          ? 1
          : a.name < b.name
          ? -1
          : a.name > b.name
          ? 1
          : 0;
      });
      console.log(filesTable)
  } catch {
    console.log('Invalid Input!')
  }
}

export const cd = async (pathToDirectory, currentDir) => {
  try {
    console.log(pathToDirectory)
    let pathToNewDirectory
    if (pathToDirectory[0] === '/') {
      pathToNewDirectory = resolve(pathToDirectory)
    } else {
      pathToNewDirectory = resolve(currentDir, pathToDirectory)
    }
    const newDirectoryInfo = await stat(pathToNewDirectory);

    if (newDirectoryInfo.isDirectory()) {
      return pathToNewDirectory
    } else {
      return currentDir
    }
  } catch {
    console.log('Invalid Input!')
    return currentDir
  }
  
  
}