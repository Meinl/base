import { database } from '../utils/firebase'
import { acceptOrder } from '../utils/api'
 
export const ADD_ORDER = 'ADD_ORDER'
export const ACCEPT_ORDER = 'ACCEPT_ORDER'
export const LOADING = 'LOADING'

/*export function handleAddedOrder() {
  return(dispatch) => {
    const addOrder = database.ref('orders')
    addOrder.on('child_added', snapshot => {
      dispatch(orderAdded(snapshot.val(), snapshot.key))
    })
  }
}*/

export function handleAcceptedOrder(tokenUID, order_id, cb) {
  return(dispatch) => {
    dispatch(loading(true))
    acceptOrder(tokenUID, order_id)
      .then(res => {
        res.status === 'success' ? cb() : null
        dispatch(loading(false))
      })
      .catch(err => console.log(err))
  }
}

export function watchStatusOrders() {
  return(dispatch) => {
    const accOrder = database.ref('orders').orderByChild('/assignment/driver_id').equalTo(1)
    accOrder.on('child_changed', snapshot => {
      dispatch(orderAccepted(snapshot.val(), snapshot.key))
    },
    (error) => { 
      console.log(error)
    })
  }
}

function orderAdded(order, key) {
  return {
    type: ADD_ORDER,
    order,
    key
  }
}

function orderAccepted(order, key) {
  return {
    type: ACCEPT_ORDER,
    order,
    key,
  }
}

function loading(loading) {
  return{
    type: LOADING,
    loading
  }
}