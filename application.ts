import { List, Set, Record as ImmutableRecord } from 'immutable'
import { Direction, getRelativeDirection, directionOffsets } from './direction'

export const Point = ImmutableRecord({ x: 0, y: 0 })
export interface Point { x: number; y: number }
export type Snake = List<Point>
export type SnakeState = 'alive' | 'dead'

export interface State {
  snakeState: SnakeState,
  snake: Snake,
  direction: Direction,
  food: Set<Point>,
  width: number, height: number
}

function collidesWithItselfGoingTo(snake: Snake, newDirection: Direction): boolean {
  return snake.size > 1
    && getRelativeDirection(snake.get(0), snake.get(1)) === newDirection
}

export function applyDirection(state: State, newDirection: Direction): State {
  const {
    snake, snakeState,
    direction: currentDirection,
    width, height
  } = state

  const direction = collidesWithItselfGoingTo(snake, newDirection)
    ? currentDirection
    : newDirection

  if (snakeState === 'dead' || direction === 'idle') {
    return state
  } else {
    const [offsetX, offsetY] = directionOffsets[direction]
    const { x: headX, y: headY } = snake.get(0)
  
    const newHead = new Point({ x: headX + offsetX, y: headY + offsetY })
  
    if (state.food.contains(newHead)) {
      return {
        ...state,
        direction,
        snake: List([newHead, ...snake.toArray()]),
        food: Set<Point>()
      }
    } else if (shouldDie()) {
      return {
        ...state,
        snakeState: 'dead'
      }
    } else {
      return {
        ...state,
        direction,
        snake: List([newHead, ...snake.slice(0, -1).toArray()])
      }
    }

    function shouldDie() {
      return snake.contains(newHead)
        || newHead.x < 0
        || newHead.y < 0
        || newHead.x >= width
        || newHead.y >= height;
    }
  }
}