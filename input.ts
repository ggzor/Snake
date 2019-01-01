import { Direction } from './direction'

import { List } from 'immutable'

import { Observable, fromEvent } from 'rxjs'
import { filter, map } from 'rxjs/operators'

const keyMappings: Record<Direction, List<number>> = {
  'left': List([37, 65]),
  'up': List([38, 87]),
  'right': List([39, 68]),
  'down': List([40, 83]),
  'idle': List()
}

const keyCodeToDirection: Record<number, Direction> = {}

for (const key in keyMappings) {
  for (const keyCode of keyMappings[key as Direction].toArray()) {
    keyCodeToDirection[keyCode] = key as Direction
  }
}

export function getKeyboardInput(): Observable<Direction> {
  return fromEvent<KeyboardEvent>(document, 'keyup').pipe(
    map(e => e.keyCode),
    map(kc => keyCodeToDirection[kc]),
    filter(kc => kc !== undefined)
  )
}