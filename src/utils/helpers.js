import { Alert } from 'react-native'

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