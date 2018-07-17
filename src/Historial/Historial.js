import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView, 
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'

const { width, height } = Dimensions.get('window');

class Historial extends Component {  
  render () {
    return (
      <View style={styles.container}>
        <Text>Historial</Text>
      </View>
      )
  }
}

export default Historial

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
  }
})