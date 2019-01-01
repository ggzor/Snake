import { State, Point } from './application'
import { Set } from 'immutable'

export function generateFood(state: State): Set<Point> {
  const foodX = Math.floor(Math.random() * state.width)
  const foodY = Math.floor(Math.random() * state.width)

  const foodPoint = new Point({ x: foodX, y: foodY })

  if(state.snake.contains(foodPoint))
    return generateFood(state)
  else
    return Set([foodPoint])
}