import fs from 'fs'
import path from 'path'

export function getFiles(dir: string, ext: RegExp = /(.js|.ts)$/) {
    return fs.readdirSync(dir).filter(file => ext.test(file)).map(f => path.join(dir, f))
}


export function getAllFiles(dir: string) {
    const files = getFiles(dir)
    fs.readdirSync(dir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .forEach((dirent) => {
        files.push(...getAllFiles(path.join(dir, dirent.name)))
    })
    return files
}

export const mainRoot = path.dirname(require.main!.filename)