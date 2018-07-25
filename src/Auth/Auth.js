import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Animated,
  Easing,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData, setUserAsync, loadingData } from '../actions/shared'

class AuthLoadingScreen extends React.Component {
  constructor() {
    super()
    this.animatedValue = new Animated.Value(0.8) //Se inicia el valor de la animación en 0
  }

  _logout = async () => {
    await AsyncStorage.multiRemove(['username', 'password'])
      .then(this.props.navigation.navigate('Login'))
      .catch(err => console.log(err))
  }
  
  componentDidMount() {
    this._logoBounce()
    this._retrieveData()
      .then(userData => this.props.dispatch(setUserAsync(userData)))
      .then(({userCredentials}) => {
        this.props.dispatch(handleInitialData(userCredentials.username, userCredentials.password))
          .then(() => {
            this.props.dispatch(loadingData(false))
            this.props.navigation.navigate('App')
          })
          .catch(() => this._logout())
      })
      .catch((err) => this._logout())
  }

  _retrieveData = async () => {
    try {
      const userData = await AsyncStorage.multiGet(['username', 'password'])
      if (userData[0][1] && userData[1][1] != null) {
        return {
          username: userData[0][1],
          password: userData[1][1]
        }
      }
      else this.props.navigation.navigate('Auth')
    }
    catch(err) {
      console.log(err)
    }
  }

  _logoBounce = () => {
    Animated.loop(
      Animated.spring(this.animatedValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      })
    ).start()
  }

  render() {

    return (
      <View style={styles.container}>
        <Animated.Image
          style={{transform:[{scale: this.animatedValue}]}} 
          source={require('../../assets/images/logo_moov_login.png')} 
        />
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