import { database } from '../utils/firebase'
 
export const ADD_ORDER = 'ADD_ORDER'

export function handleAddedOrder() {
  return(dispatch) => {
    const addOrder = database.ref('orders')
    addOrder.on('child_added', snapshot => {
      dispatch(orderAdded(snapshot.val()))
    })
  }
}

function orderAdded(order) {
  return {
    type: ADD_ORDER,
    order
  }
}