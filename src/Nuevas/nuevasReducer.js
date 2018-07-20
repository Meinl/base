import { GET_NEW_ORDERS } from './nuevasActions'

export default function newOrders(state = {}, action) {
    switch(action.type) {
      case GET_NEW_ORDERS : 
        return {
          ...state,
          ...action.newOrders
        }
      default : 
        return state
    }
  }