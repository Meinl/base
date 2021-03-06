import { LOADING } from '../actions/shared'

export default function loading(state = true, action) {
  switch(action.type) {
    case LOADING :
      return action.loading
    default: 
      return state
  }
}