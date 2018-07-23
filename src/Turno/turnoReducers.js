import { TOGGLE_TURN } from './turnoActions'

export default function turn(state = {}, action) {
  switch(action.type) {
    case TOGGLE_TURN : 
      return {
        ...state,
        ...action.turn
      }
    default : 
      return state
  }
}