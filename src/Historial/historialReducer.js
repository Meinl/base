import { GET_RECORDS } from './historialActions'

export default function records(state = {}, action) {
  switch(action.type) {
    case GET_RECORDS : 
      return {
        ...state,
        ...action.records
      }
    default : 
      return state
  }
}