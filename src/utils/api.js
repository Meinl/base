import base64 from 'base-64'
import { _throwError, _throwAlert } from './helpers'
import { database } from '../utils/firebase'

const API_PATH = 'http://moov.beenary.cl/driver'
const HEADERS = new Headers()
HEADERS.append('Content-Type', 'application/json')

export function fetchUser(username, password) {
  HEADERS.append('Authorization', 'Basic ' + base64.encode(`${username}:${password}`))
  return (
      fetch(`${API_PATH}/auth/login`, {
        method: 'GET',
        headers: HEADERS
      })
      .then(res => res.json())
      .then(data => data)
      .catch(err => _throwError(err))
  )
}

export function fetchOrdersList(driverID) {
  const orders = database.ref('orders').orderByChild('/assignment/driver_id').equalTo(parseInt(driverID))
  return orders.once('value')
  .then(snapshot => {
    return snapshot.val()
  })
}

export function toggleTurn(username, password, turn) {
  HEADERS.append('Authorization', 'Basic ' + base64.encode(`${username}:${password}`))
  if (turn === false) {
    return (
      fetch(`${API_PATH}/turn/off`, {
        method: 'GET',
        headers: HEADERS
      })
      .then(res => res.status === 401 ? _throwError(res.status) : res.json())
      .then(data => {
        return data
      })
      .catch(err => console.log('err2:', err))
    )
  }
  else if(turn === true) {
    return (
      fetch(`${API_PATH}/turn/on`, {
        method: 'GET',
        headers: HEADERS
      })
      .then(res => res.status === 401 ? _throwError(res.status) : res.json())
      .then(data => {
        return data
      })
      .catch(err => console.log('err1:', err))
    )
  }    
}

export function acceptOrder(username, password, order_id) {
  HEADERS.append('Authorization', 'Basic ' + base64.encode(`${username}:${password}`))
  return (
      fetch(`${API_PATH}/service/accept/${order_id}`, {
        method: 'GET',
        headers: HEADERS
      })
      .then(res => res.status === 401 ? _throwError(res.status) : res.json())
      .then(data => {
        return data.status === 'fail' ? _throwAlert("Ha ocurrido un error", data.data, 'Aceptar') : data
      })
      .catch(err => _throwError(err))
  )
}