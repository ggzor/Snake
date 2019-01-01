import { Point } from './application'

export type Direction = 'up' | 'right' | 'down' | 'left' | 'idle'

export const directionOffsets: Record<Direction, [number, number]> = {
  idle: [0, 0],
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0]
} 

export function getRelativeDirection(p1: Point, p2: Point): Direction | null {
  const { x: x1, y: y1 } = p1
  const { x: x2, y: y2 } = p2

  if(x1 === x2) {
    if(y1 === y2)
      return 'idle'
    else if(y1 > y2)
      return 'up'
    else
      return 'down'
  }

  if(y1 === y2) {
    if(x1 === x2)
      return 'idle'
    else if(x1 > x2)
      return 'left'
    else
      return 'right'
  }

  return null
}