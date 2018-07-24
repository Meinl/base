import React from 'react'
import {
  StyleSheet,
  AsyncStorage,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export default class Logout extends React.Component {

  _logout = async () => {
    await AsyncStorage.multiRemove(['username', 'password'])
      .then(this.props.navigation.navigate('Login'))
      .catch(err => console.log(err))
  }

  render() {
    return(
      <TouchableOpacity
        onPress={this._logout} 
        style={{paddingTop:25, 
        borderTopColor:'#CACACA', 
        borderTopWidth:0.3}}
      >
        <Text style={{color:'red'}}>Cerrar sesión</Text>
      </TouchableOpacity>
    )
  }
}
