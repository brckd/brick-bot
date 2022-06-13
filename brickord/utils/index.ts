import fs from 'fs'
import path from 'path'

export function getFiles(dir: string, ext: RegExp = /(.js|.ts)$/) {
    return fs.readdirSync(dir).filter(file => ext.test(file)).map(f => path.join(dir, f))
}