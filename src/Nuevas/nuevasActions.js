import { database } from '../utils/firebase'

export const GET_NEW_ORDERS = 'GET_NEW_ORDERS'

export function handleNewOrdersList() {
  return(dispatch) => {
    const newOrders = database.ref('orders')
    newOrders.on('value', (snapshot) => {
      dispatch(receiveNewOrdersList(snapshot.val()))
    })
  }
}

export function receiveNewOrdersList(newOrders) {
  return {
    type: GET_NEW_ORDERS,
    newOrders
  }
}