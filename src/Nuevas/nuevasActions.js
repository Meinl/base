import { database } from '../utils/firebase'
import { acceptOrder } from '../utils/api'
 
export const ADD_ORDER = 'ADD_ORDER'
export const ACCEPT_ORDER = 'ACCEPT_ORDER'

/*export function handleAddedOrder() {
  return(dispatch) => {
    const addOrder = database.ref('orders')
    addOrder.on('child_added', snapshot => {
      dispatch(orderAdded(snapshot.val(), snapshot.key))
    })
  }
}*/

/*export function handleAcceptedOrder(username, password, driverID, order_id) {
  return(dispatch) => {
    acceptOrder(username, password, order_id)
      .then(res => {
        const accOrder = database.ref('orders').orderByChild('/assignment/driver_id').equalTo(parseInt(driverID))
        return accOrder.on('child_changed', snapshot => {
          dispatch(orderAccepted(snapshot.val(), snapshot.key, order_id))
        })
      })
      .catch(err => console.log(err))
  }
}*/

export function watchStatusOrders(dispatch) {
  const accOrder = database.ref('orders').orderByChild('/assignment/driver_id').equalTo(1)
  accOrder.on('child_changed', snapshot => {
    dispatch(orderAccepted(snapshot.val(), snapshot.key))
  })
}

function orderAdded(order, key) {
  return {
    type: ADD_ORDER,
    order,
    key
  }
}

function orderAccepted(order, key, order_id) {
  return {
    type: ACCEPT_ORDER,
    order,
    key,
    order_id
  }
}