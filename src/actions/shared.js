import { fetchUser, fetchOrdersList } from '../utils/api'
import { _throwError } from '../utils/helpers'

 
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SET_USER_ASYNC = 'SET_USER_ASYNC'
export const LOADING = 'LOADING'

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

export function setUserAsync(userCredentials) {
  return {
    type: SET_USER_ASYNC,
    userCredentials
  }
}

export function handleInitialData (username, password, driverID) {
  return (dispatch) => {
    return Promise.all([
      fetchUser(username, password),
      fetchOrdersList(driverID),
    ]).then(([user, orders]) => {
        return dispatch(receiveData(user.data, orders))
      })
      .catch(err => _throwError(err))
  }
}