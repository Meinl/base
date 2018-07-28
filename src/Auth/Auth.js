import React from 'react'
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData, setUserAsync, loadingData } from '../actions/shared'

class AuthLoadingScreen extends React.Component {
  
  componentDidMount() {
    this._retrieveData()
      .then(userData => console.log('1: then retrieve data') || this.props.dispatch(setUserAsync(userData)))
      .then(({userCredentials}) => { console.log('2: then setuserasync') ||
        this.props.dispatch(handleInitialData(userCredentials.username, userCredentials.password, userCredentials.driverID))
          .then(() => {
            console.log('3: handleintialdata')
            this.props.dispatch(loadingData(false))
            this.props.navigation.navigate('App')
          })
          .catch((err) => console.log(err) || this._logout())
      })
      .catch((err) => console.log(err) || this._logout())
  }

  _logout = async () => {
    await AsyncStorage.multiRemove(['username', 'password', 'driverID'])
      .then(this.props.navigation.navigate('Login'))
      .catch(err => console.log(err))
  }

  _retrieveData = async () => {
    try {
      const userData = await AsyncStorage.multiGet(['username', 'password', 'driverID'])
      if (userData[0][1] && userData[1][1] && userData[2][1] != null) {
        return {
          username: userData[0][1],
          password: userData[1][1],
          driverID: userData[2][1]
        }
      }
      else this.props.navigation.navigate('Auth')
    }
    catch(err) {
      console.log(err)
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Image 
          source={require('../../assets/images/logo_moov_login.png')} 
        />
        <ActivityIndicator size='large' color='#148B97' style={{marginTop:50}}/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
  })

  export default connect()(AuthLoadingScreen)