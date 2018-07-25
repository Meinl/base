import base64 from 'base-64'
import { _throwError } from './helpers'
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
      .then(res => res.status === 401 ? _throwError(res.status) : res.json())
      .then(data => {
        return data
      })
      .catch(err => console.log('err:', err))
  )
}

export function fetchNewOrdersList() {
  const newOrders = database.ref('orders')
  return (
    newOrders.once('value')
    .then(snapshot => {
      return snapshot.val()
    })
  )
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