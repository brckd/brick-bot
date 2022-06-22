export const libRoot = __dirname
export * from './utils'
export * from './structures'
export * from './loaders'

import * as Brickord from '.'
export default Brickord as Omit<typeof Brickord, 'default'>