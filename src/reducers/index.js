import user from '../User/userReducers'
import orders from '../Nuevas/nuevasReducer'
import loading from './loading'
import { combineReducers } from 'redux'

export default combineReducers({
  user,
  orders,
  loading,
})
