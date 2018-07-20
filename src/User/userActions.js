import { getUser } from '../utils/api'
import { _throwAlert } from '../utils/helpers'

export const GET_USER = 'GET_USER'

export function handleUser(username, password, cb) {
  return (dispatch) => {
    return getUser(username, password)
    .then(({status, data}) => {
      dispatch(receiveUser(data))
      cb()
    })
    .catch(() => _throwAlert('Usuario o contraseña incorrectas', 'El usuario o contraseña que ingresaste son incorrectos. Vuelve a intentarlo.', 'Aceptar'))
  }
}

export function receiveUser(user) {
  return {
    type: GET_USER,
    user
  }
}



