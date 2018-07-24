import { database } from '../utils/firebase'
import { RECEIVE_DATA } from '../actions/shared';

export function fetchNewOrdersList() {
  return(dispatch) => {
    const newOrders = database.ref('orders')
    newOrders.on('value', (snapshot) => {
      dispatch(receiveNewOrdersList(snapshot.val()))
    })
  }
}

function receiveNewOrdersList(newOrders) {
  return {
    type: RECEIVE_DATA,
    newOrders
  }
}