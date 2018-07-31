import { RECEIVE_DATA } from '../actions/shared';
import { ADD_ORDER, ACCEPT_ORDER, REMOVE_ORDER } from './nuevasActions';

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
      case REMOVE_ORDER : {
        return removeProperty(state, action.key)
      }
      default : 
        return state
    }
  }

  const removeProperty = (obj, property) => {
    return  Object.keys(obj).reduce((acc, key) => {
      if (key !== property) {
        return {...acc, [key]: obj[key]}
      }
      return acc
    }, {})
  }