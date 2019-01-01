import { State, Point } from './application'

import { h } from 'snabbdom'

import flatMap from 'lodash/flatMap'
import mapValues from 'lodash/mapValues'
import range from 'lodash/range'

export const getView = (state: State) =>
  h('div#app', {}, [
      h('h3.score', {}, `Score: ${state.snake.size}`),
      h('div.board', { style: getCssVariables(state) },
        flatMap(range(state.height), y => range(state.width).map(x =>
          h('div.cell', { class: getCellClass(state, new Point({ x, y })) })
        ))
      )
    ]
  )

const getCssVariables = (state: State) => mapValues({
  '--board-width': state.width,
  '--board-height': state.height,
  '--max-size': Math.max(state.width, state.height)
}, v => v.toString())

const getCellClass = (state: State, point: Point) => {
  const cellClass = 
    state.snake.contains(point) 
    ? (
      state.snakeState === 'alive'
        ? 'active'
        : 'dead'
    )
    : (
      state.food.contains(point) 
        ? 'food'
        : 'inactive'
    )

  const obj: Record<string, boolean> = {}
  obj[cellClass] = true
  return obj
}