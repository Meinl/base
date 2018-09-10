import React from 'react'
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Header from './Header'
import { DrawerItems } from 'react-navigation'
import Logout from '../Auth/Logout'
import { connect } from 'react-redux'
import { Permissions, Notifications, Location } from 'expo'
import { setPushToken, sendPosition } from '../utils/api'

const { height } = Dimensions.get('window');

class DrawerComponent extends React.Component {
  state = {
    errorMessage:'',
    coords: {
      lat: 0,
      lng: 0,
      hight:0,
      angle:0
    }
  }
  location = null
 
  componentDidMount() {
    const { tokenUID } = this.props.user
    this._getLocationAsync(tokenUID)
    this._registerForPushNotificationsAsync(tokenUID)
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
    if (Platform.OS === 'android') {
      Expo.Notifications.createChannelAndroidAsync('orders', {
        name: 'Orders',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }
  }

  componentWillUnmount() {
    this.location.remove()
  }

  _getLocation = (location) => {
    const { tokenUID } = this.props.user
    const { latitude, longitude, altitude, heading } = location.coords
    this.setState({
      coords: {
        lat: latitude,
        lng: longitude,
        hight: altitude,
        angle: heading
      }
    })
    sendPosition(tokenUID, this.state.coords)
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permiso denegado para acceder a su posición',
      })
      alert(this.state.errorMessage)
    }
    this.location = await Location.watchPositionAsync({
      enableHighAccuracy: true, distanceInterval: 30, timeInterval: 500
    }, this._getLocation)
  }

  _registerForPushNotificationsAsync = async(tokenUID) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let tokenDevice = await Notifications.getExpoPushTokenAsync()
    console.log(tokenDevice)
  
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return setPushToken(tokenUID, tokenDevice)
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification})
    console.log('LLEGO: ', this.state.notification)
  }

  render() {
    return(
      <View style={{flex:1}}>
        <View style={{flex:1, padding:20}}>
          <Header {...this.props}/>
          <DrawerItems {...this.props}
            activeBackgroundColor='transparent'
            getLabel = {(route) => (
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.props.getLabel(route)}</Text>
              <Ionicons name= 'ios-arrow-forward-outline' size={28} color="#000" />
            </View>
          )}
        />
        <Logout navigation={this.props.navigation}/>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Text style={{color:'white', fontSize:18}}>Llamar a Central</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    height:height/10,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
  },
  callButton:{
    justifyContent:'center', 
    alignItems:'center', 
    height:60, 
    marginHorizontal:20, 
    marginBottom:10, 
    backgroundColor:'#148B97',
    borderRadius:5,
    elevation:1,
    shadowColor:'black',
    shadowOffset: {width:0, height:5},
    shadowOpacity:0.3,
    shadowRadius:2,
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DrawerComponent)