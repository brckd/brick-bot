export * from './client'
export * from './command'
export * from './event'
export * from './errors'

import * as Structures from '.'
export default Structures as Omit<typeof Structures, 'default'>