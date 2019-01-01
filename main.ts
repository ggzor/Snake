
import { State, Point, applyDirection } from './application'
import { initialize } from './virtual'
import { getKeyboardInput } from './input'
import { generateFood } from './food'

import { List, Set } from 'immutable'

import { Store } from 'reactive-state'

import { interval } from 'rxjs'
import { map, withLatestFrom, filter } from 'rxjs/operators'

const width = 30
const height = 30

const element = document.getElementById('app')
const { applyStates } = initialize(element)

const initialState: State = {
  snakeState: 'alive',
  snake: List([new Point({ 
    x: Math.floor(width / 2), 
    y: Math.floor(height / 2) 
  })]),
  width, height,
  direction: 'idle',
  food: Set<Point>()
}

const store = Store.create<State>(initialState)

const direction = interval(200).pipe(
  withLatestFrom(getKeyboardInput()),
  map(([_, dir]) => dir)
)

const food = store.watch(s => s.food).pipe(
  filter(f => f.isEmpty()),
  withLatestFrom(store.watch()),
  map(([_, state]) => state),
  map(generateFood)
)

store.addReducer(food, (s, f) => ({ ...s, food: f }))
store.addReducer(direction, applyDirection)

applyStates(store.select())