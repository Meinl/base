import { getRecords } from "../utils/api";

export const GET_RECORDS = 'GET_RECORDS'

export function handleRecords(tokenUID) {
  return(dispatch) => {
    getRecords(tokenUID)
      .then(records => console.log('records: ', records.data) || dispatch(recordsGet(records.data)))
      .catch(err => console.log('record err: ', err))
  }
}

function recordsGet(records) {
  return {
    type: GET_RECORDS,
    records
  }
}