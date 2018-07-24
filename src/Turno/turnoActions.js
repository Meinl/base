import { toggleTurn } from "../utils/api";
import { _throwAlert } from '../utils/helpers'

export const TOGGLE_TURN = 'TOGGLE_TURN'

export function handleTurn(username, password, value, cb) {
  return (dispatch) => {
    toggleTurn(username, password, value)
    .then(({status, data}) => {
      dispatch(chageTurn(data.turn))
      cb()
    })
    .catch(() => {
      _throwAlert('Usuario o contraseña incorrectas', 'El usuario o contraseña que ingresaste son incorrectos. Vuelve a intentarlo.', 'Aceptar')
    })
  }
}

export function chageTurn(value) {
  return {
    type:'TOGGLE_TURN',
    turn: value
  }
}