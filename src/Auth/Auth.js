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
import { handleInitialData, watchOrders, loadingData, handleUserLogin } from '../actions/shared'
import { watchStatusOrders, handleAddedOrder, handleRemovedOrder } from '../Nuevas/nuevasActions'
class AuthLoadingScreen extends React.Component {
  state = {
    notification: {}
  }
  
  componentDidMount() {
    this._retrieveData()
      .then(tokenUID => {
        this.props.dispatch(watchStatusOrders(this.props.user.id))
        this.props.dispatch(handleAddedOrder(this.props.user.id))
        this.props.dispatch(handleRemovedOrder(this.props.user.id))  
        this.props.dispatch(handleInitialData(tokenUID, this.props.user.id))
          .then(() => {
            this.props.dispatch(loadingData(false))
            this.props.dispatch(watchOrders(true))
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