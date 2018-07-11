import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,  
} from 'react-native'
import OrderList from './OrderList';

export default class Aceptadas extends Component {
  
  render () {
    return (
      <View style={styles.container}>
        <OrderList/>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex:1
  }
})