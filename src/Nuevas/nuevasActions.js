import { database } from '../utils/firebase'
import { acceptOrder } from '../utils/api'
 
export const ADD_ORDER = 'ADD_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ACCEPT_ORDER = 'ACCEPT_ORDER'
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION'
export const LOADING = 'LOADING'

export function handleAddedOrder(id) {
  return(dispatch, getState) => {
    const addOrder = database.ref('orders').orderByChild('/assignment/driver_id').equalTo(id)
    addOrder.on('child_added', snapshot => {
      if(getState().orders.watch === true)
        dispatch(orderAdded(snapshot.val(), snapshot.key))
    })
  }
}

export function handleRemovedOrder(id) {
  return(dispatch) => {
    const addOrder = database.ref('orders').orderByChild('/assignment/driver_id').equalTo(id)
    addOrder.on('child_removed', snapshot => {
      dispatch(orderRemoved(snapshot.val(), snapshot.key))
    },
    (error) => { 
      console.log(error)
    })
  }
}

export function handleAcceptedOrder(tokenUID, order_id, cb) {
  return(dispatch) => {
    dispatch(loading(true))
    acceptOrder(tokenUID, order_id)
      .then(res => {
        res.status === 'success' ? cb() : null
        dispatch(loading(false))
      })
      .catch(err => console.log(err) || dispatch(loading(false)))
  }
}

export function watchStatusOrders(id) {
  return(dispatch) => {
    const accOrder = database.ref('orders').orderByChild('/assignment/driver_id').equalTo(id)
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

function orderRemoved(order, key) {
  return {
    type: REMOVE_ORDER,
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

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION
  }
}