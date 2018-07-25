import { fetchUser, fetchNewOrdersList } from '../utils/api'
 
export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(user, newOrders) {
  return {
    type:'RECEIVE_DATA',
    user,
    newOrders
  }
}

export function handleInitialData (username, password, cb) {
  return (dispatch) => {
    Promise.all([
      fetchUser(username, password),
      fetchNewOrdersList(),
    ]).then(([user, orders]) => {
        dispatch(receiveData(user.data, orders))
        cb()
    })
  }
}