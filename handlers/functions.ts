import fs from 'fs'

export function getFiles(path: string, ending: string) {
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}