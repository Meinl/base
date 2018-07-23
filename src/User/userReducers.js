import { GET_USER, LOADING } from './userActions'

export default function user(state = {}, action) {
  switch(action.type) {
    case GET_USER : 
      return {
        ...state,
        ...action.user
      }
    case LOADING : {
      return {
        ...state,
        isLoading: action.isLoading
      }  
    }
    default : 
      return state
  }
}