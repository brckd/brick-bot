export * from './client'
export * from './command'
export * from './event'

import * as Structures from '.'
export default Structures as Omit<typeof Structures, 'default'>