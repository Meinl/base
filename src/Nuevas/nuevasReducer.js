import { RECEIVE_DATA } from '../actions/shared';
import { ADD_ORDER, ACCEPT_ORDER } from './nuevasActions';

export default function orders(state = {}, action) {
    switch(action.type) {
      case RECEIVE_DATA : 
        return {
          ...state,
          ...action.orders
        }
      case ADD_ORDER : {
        return {
          ...state,
          [action.key]: action.order
        }
      }
      case ACCEPT_ORDER : {
        return {
          ...state,
          [action.key]: action.order
        }
      }
      default : 
        return state
    }
  }