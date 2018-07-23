import base64 from 'base-64'
import { _throwError } from './helpers'
import { AsyncStorage } from 'react-native'

const API_PATH = 'http://moov.beenary.cl/driver'
const HEADERS = new Headers()

export async function _getUserAndPass() {
  return await AsyncStorage.multiGet(['username', 'password'])
}

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

export function toggleTurn(turn) {
  _getUserAndPass()
    .then(res => {
      HEADERS.append('Authorization', 'Basic ' + base64.encode(`${res[0][1]}:${res[1][1]}`))
      HEADERS.append('Content-Type', 'application/json')
      if (turn === true) {
        return (
          fetch(`${API_PATH}/driver/turn/off`, {
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
      else {
        console.log('username: ', loggedUser, 'password: ', loggedPass)
        return (
          fetch(`${API_PATH}/driver/turn/on`, {
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
    }
  )
}