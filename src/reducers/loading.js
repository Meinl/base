import { RECEIVE_DATA } from '../actions/shared'

export default function loading(state = false, action) {
  switch(action.type) {
    case RECEIVE_DATA :
      return true
    default: 
      return state
  }
}