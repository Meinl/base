import { toggleTurn } from "../utils/api";
import { _throwAlert } from '../utils/helpers'
import { changeTurn } from '../User/userActions'

export const TOGGLE_TURN = 'TOGGLE_TURN'

export function handleTurn(username, password, turn) {
  return (dispatch) => {
    dispatch(changeTurn(turn))
    toggleTurn(username, password, turn)
    .then(({status, data}) => {
    })
    .catch(() => {
      dispatch(changeTurn(!turn))
      _throwAlert('Ha ocurrido un error', 'Favor vuelve a intentarlo.', 'Aceptar')
    })
  }
}