import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,  
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class NoOrders extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.mainText}>No hay órdenes nuevas</Text>
        <Text style={styles.secondText}>¡Te notificaremos cuando se te envíe una!</Text>
        <Ionicons
          style={styles.warningIcon} 
          name='ios-warning' 
          size={30} 
          color='#148b97'
        />
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    marginTop: 80
  },
  mainText: {
    textAlign:'center',
    fontSize:60,
    fontFamily: 'roboto-black',
    color: '#5c5d5e',
    paddingHorizontal: 20,
    lineHeight: 75
  },
  secondText: {
    color: '#5c5d5e',
    fontSize: 16,
    lineHeight: 28,
    fontFamily:'roboto',
    textAlign: 'center',
    paddingHorizontal: 90,
    marginTop: 10
  },
  warningIcon: {
    marginTop:10
  }
})