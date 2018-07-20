import user from '../User/userReducers'
import newOrders from '../Nuevas/nuevasReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  user,
  newOrders
})
