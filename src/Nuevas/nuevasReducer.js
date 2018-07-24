import { RECEIVE_DATA } from '../actions/shared';

export default function newOrders(state = {}, action) {
    switch(action.type) {
      case RECEIVE_DATA : 
        return {
          ...state,
          ...action.newOrders
        }
      default : 
        return state
    }
  }