import { RECEIVE_DATA } from '../actions/shared';
import { ADD_ORDER } from './nuevasActions';

export default function newOrders(state = {}, action) {
    switch(action.type) {
      case RECEIVE_DATA : 
        return {
          ...state,
          ...action.newOrders
        }
      case ADD_ORDER : {
        //return state.concat([action.order])
      }
      default : 
        return state
    }
  }