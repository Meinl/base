import user from '../User/userReducers'
import newOrders from '../Nuevas/nuevasReducer'
import loading from './loading'
import { combineReducers } from 'redux'

export default combineReducers({
  user,
  newOrders,
  loading
})
