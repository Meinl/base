import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Drawer } from './src/navigators'
import { Font } from 'expo'

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render(){
    return (
      this.state.fontLoaded ? <Drawer /> : <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator size="large" color="#148B97" /></View>
    )
  }
}