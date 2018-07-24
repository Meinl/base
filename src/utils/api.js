import base64 from 'base-64'
import { _throwError } from './helpers'

const API_PATH = 'http://moov.beenary.cl/driver'
const HEADERS = new Headers()

export function getUser(username, password) {
  HEADERS.append('Authorization', 'Basic ' + base64.encode(`${username}:${password}`))
  HEADERS.append('Content-Type', 'application/json')
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

export function toggleTurn(username, password, turn) {
  HEADERS.append('Authorization', 'Basic ' + base64.encode(`${username}:${password}`))
  HEADERS.append('Content-Type', 'application/json')
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