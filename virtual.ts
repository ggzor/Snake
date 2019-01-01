import { init } from 'snabbdom'
import { VNode } from 'snabbdom/vnode'
import { classModule } from 'snabbdom/modules/class'
import { styleModule } from 'snabbdom/modules/style'

import { State } from './application'
import { getView } from './layout'

import { Observable } from 'rxjs'
import { startWith, map, bufferCount } from 'rxjs/operators'

export function initialize(element: Element) {
  const patch = init([classModule, styleModule])

  function applyStates(state: Observable<State>): void {
    state.pipe(
      map(getView),
      startWith(element),
      bufferCount(2, 1)
    ).subscribe(([old, nw]) => patch(old, nw as VNode))
  }

  return { applyStates }
}