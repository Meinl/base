import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class AuthLoadingScreen extends React.Component {
  constructor() {
    super()
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    await AsyncStorage.multiGet(['username', 'password'])
    .then(userLogin => {
      if(userLogin[0][1] && userLogin[1][1]) {
        this.props.dispatch(handleInitialData(userLogin[0][1], userLogin[1][1], () => {
          this.props.navigation.navigate('App')
        }))
      }
      else {
        this.props.navigation.navigate('Auth')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
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