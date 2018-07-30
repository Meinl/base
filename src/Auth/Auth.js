import React from 'react'
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  View,
  Image
} from 'react-native'
import { Permissions, Notifications } from 'expo'
import { setPushToken } from '../utils/api'
import { connect } from 'react-redux'
import { handleInitialData, setUserAsync, loadingData, handleUserLogin } from '../actions/shared'

class AuthLoadingScreen extends React.Component {
  state = {
    notification: {}
  }
  
  componentDidMount() {
    this._retrieveData()
      .then(tokenUID => {  
        this.props.dispatch(handleInitialData(tokenUID, this.props.user.id))
          .then(() => {
            this._registerForPushNotificationsAsync(tokenUID)
            this._notificationSubscription = Notifications.addListener(this._handleNotification);
            this.props.dispatch(loadingData(false))
            this.props.navigation.navigate('App')
          })
          .catch((err) => console.log(err) || this._logout())
      })
      .catch((err) => console.log(err) || this._logout())
  }

  _logout = async () => {
    await AsyncStorage.removeItem('tokenUID')
      .then(this.props.navigation.navigate('Login'))
      .catch(err => console.log(err))
  }

  _retrieveData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('tokenUID')
      if (userToken != null) {
      return this.props.dispatch(handleUserLogin(userToken))
        .then(() => userToken)
        .catch((err) => console.log(err) || this._logout())
      }
      else this.props.navigation.navigate('Auth')
    }
    catch(err) {
      console.log(err)
    }
  }

  _registerForPushNotificationsAsync = async(tokenUID) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let tokenDevice = await Notifications.getExpoPushTokenAsync();
  
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return setPushToken(tokenUID, tokenDevice)
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification})
    console.log('LLEGO: ', notification)
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(AuthLoadingScreen)