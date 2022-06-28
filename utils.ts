export function replace(text: string, search: string | RegExp, replace: string | ((value: string, index: number, array: string[]) => string)) {
    const matches = (text.match(search) ?? []).map(typeof(replace) === 'string' ? ()=>replace : replace)
    const others = text.split(search)
    return others.map((o, i) => o + (matches[i] ?? '')).join('')
}