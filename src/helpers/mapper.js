import {
  compose,
  map,
  toPairs,
  fromPairs
} from 'ramda'
import { toSnake } from './toSnakeCase'

const firstIndexToSnakeCase = map(
  item => [[toSnake(item[0])], item[1]]
)

export const objectKeyToSnakeCase = compose(
  fromPairs,
  firstIndexToSnakeCase,
  toPairs
)
