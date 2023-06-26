import {resolve} from 'path'
import { createReadStream } from 'fs'
import { access, copyFile, writeFile, rm as removeFile, rename } from 'fs/promises'

export const add = async (pathToFileNew, currentDirectory) => {
  try {
    const newFilePathResolved = resolve(currentDirectory, pathToFileNew)
    await writeFile(newFilePathResolved, "", { flag: "wx" })
  } catch {
    console.log('Invalid Input!')
  }
}

export const cat = async (pathToFile, currentDirectory) => {
  try {
    const resolvedPathToFile = resolve(currentDirectory, pathToFile)
    await access(resolvedPathToFile)
    const readStream =  createReadStream(resolvedPathToFile, 'utf-8')
    readStream.on('data', (chunk) => {
      process.stdout.write(chunk)
    });
  } catch {
    console.log('Invalid Input!')
  }
}

export const rn = async (pathToFile, pathToFileNew, currentDirectory) => {
  try {
    const pathToFileResolved = resolve(currentDirectory, pathToFile)
    const newFilePathResolved = resolve(currentDirectory, pathToFileNew)

    await rename(pathToFileResolved, newFilePathResolved);
  } catch {
    console.log('Invalid Input!')
  }
};



export const rm = async (pathToFile, currentDirectory) => {
  try {
    const pathToFileResolved = resolve(currentDirectory, pathToFile)
    await removeFile(pathToFileResolved)
  } catch {
    console.log('Invalid Input!')
  }
}

export const mv = async (pathToFile, pathToFileNew, currentDirectory) => {
  try {
    const pathToFileResolved = resolve(currentDirectory, pathToFile)
    const newFilePathResolved = resolve(currentDirectory, pathToFileNew, pathToFile)

    await copyFile(pathToFileResolved, newFilePathResolved)
    await removeFile(pathToFileResolved);
  } catch {
    console.log('Invalid Input!')
  }
}

export const cp = async (pathToFile, pathToFileNew, currentDirectory) => {
  try {
    const pathToFileResolved = resolve(currentDirectory, pathToFile)
    const newFilePathResolved = resolve(currentDirectory, pathToFileNew)
    await copyFile(pathToFileResolved, newFilePathResolved);
  } catch {
    console.log('Invalid Input!')
  }
};


