import {greet} from 'dual-mode-package' // eslint-disable-line node/no-extraneous-import
import {world} from 'dual-mode-package/world' // eslint-disable-line node/no-missing-import

console.log(greet(world()))
