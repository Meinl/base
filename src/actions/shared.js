import { fetchUser } from '../utils/api'
import { fetchNewOrdersList } from '../Nuevas/nuevasActions'
 
export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(user) {
  return {
    type:'RECEIVE_DATA',
    user
  }
}

export function handleInitialData (username, password, cb) {
  return (dispatch) => {
    Promise.all([
      fetchUser(username, password),
    ]).then(([data]) => {
      dispatch(receiveData(data.data))
      cb()
    }).then(()=> dispatch(fetchNewOrdersList()))
  }
}