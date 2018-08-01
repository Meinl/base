import { fetchUser, fetchOrdersList } from '../utils/api'
import { _throwError, _signInAsync } from '../utils/helpers'
 
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SET_USER = 'SET_USER'
export const LOADING = 'LOADING'
export const ORDER_WATCH = 'ORDER_WATCH'

export function loadingData(loading) {
  return {
    type: LOADING,
    loading
  }
}

function receiveData(user, orders) {
  return {
    type: RECEIVE_DATA,
    user,
    orders
  }
}

export function watchOrders(watch) {
  return {
    type: ORDER_WATCH,
    watch
  }
}

export function handleUserLogin(tokenUID) {
  return(dispatch) => {
    return fetchUser(tokenUID)
      .then(data => {
        if(data.status === 'success') 
         return dispatch(setUser(data.data, tokenUID)) 
      })
      .catch(err => console.log(err) || err)
  }
}

export function setUser(user, tokenUID) {
  return {
    type: SET_USER,
    user,
    tokenUID
  }
}

export function handleInitialData (tokenUID, driverID) {
  return (dispatch) => {
    return Promise.all([
      fetchUser(tokenUID),
      fetchOrdersList(driverID),
    ]).then(([user, orders]) => {
        return dispatch(receiveData(user.data, orders))
      })
      .catch(err => _throwError(err))
  }
}