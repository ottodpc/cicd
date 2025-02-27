import { readFileSync } from 'fs'
import { promisify } from 'util'

export const delay = promisify(setTimeout)
export const readResourceFromPath = (filePath): string =>
	readFileSync(__dirname + filePath, { encoding: 'utf8', flag: 'r' })
export const readResourceFromExactPath = (filePath): string =>
	readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
