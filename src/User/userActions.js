import { getUser } from '../utils/api'
import { _throwAlert } from '../utils/helpers'

export const GET_USER = 'GET_USER'
export const LOADING = 'LOADING'

export function handleUser(username, password, cb) {
  return (dispatch) => {
    dispatch(loading(true))
    return getUser(username, password)
    .then(({status, data}) => {
      dispatch(receiveUser(data))
      cb()
    })
    .catch(() => {
      dispatch(loading(false))
      _throwAlert('Usuario o contraseña incorrectas', 'El usuario o contraseña que ingresaste son incorrectos. Vuelve a intentarlo.', 'Aceptar')
    })
  }
}

export function receiveUser(user) {
  return {
    type: GET_USER,
    user
  }
}

export function loading(isLoading) {
  return {
    type: LOADING,
    isLoading
  }
}



