import { GET_USER } from './userActions'

export default function user(state = {}, action) {
  switch(action.type) {
    case GET_USER : 
      return {
        ...state,
        ...action.user
      }
    default : 
      return state
  }
}