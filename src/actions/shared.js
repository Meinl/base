import { fetchUser, fetchNewOrdersList } from '../utils/api'
import { _throwAlert } from '../utils/helpers'

 
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SET_USER_ASYNC = 'SET_USER_ASYNC'
export const LOADING = 'LOADING'

export function loadingData(loading) {
  return {
    type: LOADING,
    loading
  }
}

function receiveData(user, newOrders) {
  return {
    type: RECEIVE_DATA,
    user,
    newOrders
  }
}

export function setUserAsync(userCredentials) {
  return {
    type: SET_USER_ASYNC,
    userCredentials
  }
}

export function handleInitialData (username, password) {
  return (dispatch) => {
    return Promise.all([
      fetchUser(username, password),
      fetchNewOrdersList(),
    ]).then(([user, orders]) => {
        return dispatch(receiveData(user.data, orders))
      })
      .catch(() => _throwAlert('Usuario o contraseña incorrectas', 'El usuario o contraseña que ingresaste son incorrectos. Vuelve a intentarlo.', 'Aceptar'))
  }
}