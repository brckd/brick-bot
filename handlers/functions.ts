import fs from 'fs'
import path from 'path'

export function getFiles(dir: string, ending: string): string[] {
    return fs.readdirSync(dir).filter(f => f.endsWith(ending)).map(f => path.join(dir, f))
}