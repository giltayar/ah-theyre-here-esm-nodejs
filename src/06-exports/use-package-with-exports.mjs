import {greet} from 'package-with-exports' // eslint-disable-line node/no-extraneous-import
import {world} from 'package-with-exports/world' // eslint-disable-line node/no-missing-import

console.log(greet(world()))
