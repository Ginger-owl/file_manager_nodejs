import {resolve} from 'path'
import { createReadStream, createWriteStream} from 'fs'
import { createBrotliCompress, createBrotliDecompress } from 'zlib'

export const compress = async (pathToFile, pathToCompressedFile, currentDirectory) => {
  try {
    const resolvedPathToFile = resolve(currentDirectory, pathToFile)
    const resolvedPathToCompressed = resolve(currentDirectory, pathToCompressedFile)

    const brotli = createBrotliCompress()
    const input = createReadStream(resolvedPathToFile)
    const output = createWriteStream(resolvedPathToCompressed)
    input.pipe(brotli).pipe(output);
  } catch {
    console.log('Invalid input!')
  }
};

export const decompress = async (pathToFile, pathToDecompressedFile, currentDirectory) => {
  try {
    const resolvedPathToFile = resolve(currentDirectory, pathToFile)
    const resolvedPathToDecompressed = resolve(currentDirectory, pathToDecompressedFile)

    const deBrotli = createBrotliDecompress()
    const input = createReadStream(resolvedPathToFile)
    const output = createWriteStream(resolvedPathToDecompressed)
    input.pipe(deBrotli).pipe(output);
  } catch {
    console.log('Invalid input!')
  }
};