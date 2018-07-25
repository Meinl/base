import { LOADING, CHANGE_TURN } from './userActions'
import { RECEIVE_DATA, SET_USER_ASYNC } from '../actions/shared';

const initialState = {
  credentials: {}
}

export default function user(state = initialState, action) {
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
    case SET_USER_ASYNC : {
      return {
        ...state,
        credentials: action.userCredentials
      }
    }
    default : 
      return state
  }
}