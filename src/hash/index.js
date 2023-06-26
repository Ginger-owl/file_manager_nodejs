import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

export const calculateHash = async (pathToFile, currentDirectory) => {
  try {
    const resolvedPath = resolve(currentDirectory, pathToFile);
    const data = await readFile(resolvedPath)
    const hash = createHash('sha256', data).update(data).digest('hex');
    console.log(hash)
  } catch {
    console.log('Invalid Input!')
  }
};
