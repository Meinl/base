import { Alert, AsyncStorage } from 'react-native'
import base64 from 'base-64'

export function _throwError(err) {
  throw new Error(err)
}

export function _throwAlert(title, subtitle, opt1, cancel) {
  Alert.alert(
    title,
    subtitle,
    [
      opt1 ? {text: opt1, onPress: () => console.log(opt1)} : '',
      cancel ? {text: cancel, onPress: () => console.log(cancel), style: 'cancel'} : '',
    ],
    { cancelable: false }
  )
}

export async function signInAsync (tokenUID) {
  try {
    AsyncStorage.setItem('tokenUID', tokenUID)
  }
  catch (error) {
    error => console.log(error)
  }
}

// Months array
const months_arr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
// Days array
const days_arr= ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Year
const year = (date) => date.getFullYear();
// Month
const month = (date) => months_arr[date.getMonth()];
// Day
const day = (date) => date.getDate();

//Day like string
const dayString = (date) => days_arr[date.getDay()];
// Hours
const hours = (date) => date.getHours();
// Minutes
const minutes = (date) => "0" + date.getMinutes();
// Seconds
const seconds = (date) => "0" + date.getSeconds();

export function getFullDate(timestamp){
const date = new Date(timestamp*1000);
return month(date)+'-'+day(date)+'-'+year(date)+' '+hours(date) + ':' + minutes(date).substr(-2) + ':' + seconds(date).substr(-2);
}

export function getTime(timestamp){
const date = new Date(timestamp*1000);
return hours(date) + ':' + minutes(date).substr(-2);
}

export function getDateMD(timestamp){
const date = new Date(timestamp*1000);
return `${dayString(date)} ${day(date)}, ${month(date)}`
}