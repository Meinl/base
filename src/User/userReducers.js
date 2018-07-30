import { LOADING, CHANGE_TURN } from './userActions'
import { RECEIVE_DATA, SET_USER } from '../actions/shared';

export default function user(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DATA : 
      return {
        ...state,
        ...action.user
      }
    case CHANGE_TURN : {
      return {
        ...state,
        turn: action.turn
      }
    }
    case SET_USER : {
      return {
        ...state,
        ...action.user,
        tokenUID: action.tokenUID
      }
    }
    default : 
      return state
  }
}