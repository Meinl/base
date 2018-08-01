import { RECEIVE_DATA, ORDER_WATCH } from '../actions/shared';
import { ADD_ORDER, ACCEPT_ORDER, REMOVE_ORDER, RESET_NOTIFICATION } from './nuevasActions';

export const initialState = {
  watch: false,
  list: {},
  notification: 0
}

export default function orders(state = initialState, action) {
    switch(action.type) {
      case RECEIVE_DATA : 
        return {
          ...state,
          list: action.orders
        }
      case ADD_ORDER : {
        const notification = state.notification
        return {
          ...state,
          list: {
            ...state.list,
            [action.key]: action.order
          },
          notification: notification + 1
        }
      }
      case ACCEPT_ORDER : {
        return {
          ...state,
          list: {
            ...state.list,
            [action.key]: action.order
          }
        }
      }
      case REMOVE_ORDER : {
        return {
          ...state,
          list: removeProperty(state.list, action.key)
        }
      }
      case ORDER_WATCH : {
        return {
          ...state,
          watch: action.watch
        }
      }
      case RESET_NOTIFICATION: {
        return {
          ...state,
          notification: 0
        }
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