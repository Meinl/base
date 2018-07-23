import user from '../User/userReducers'
import newOrders from '../Nuevas/nuevasReducer'
import turn from '../Turno/turnoReducers'
import { combineReducers } from 'redux'

export default combineReducers({
  user,
  newOrders,
  turn
})
