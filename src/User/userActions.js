import { getUser } from '../utils/api'

export const GET_USER = 'GET_USER'

export function handleUser(username, password, cb) {
  return (dispatch) => {
    console.log(username, password)
    return getUser(username, password)
    .then(({status, data}) => {
      if(status === 'success') {
        dispatch(receiveUser(data))
        cb()
      }
    })
  }
}

export function receiveUser(user) {
  return {
    type: GET_USER,
    user
  }
}



