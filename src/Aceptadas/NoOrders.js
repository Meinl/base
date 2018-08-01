import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet, 
  TouchableOpacity,  
} from 'react-native'

export default class NoOrders extends React.Component {
  render() {
    console.log('No Orders: ', this.props)
    return(
      <View style={styles.container}>
        <Text style={styles.mainText}>No hay órdenes aceptadas</Text>
        <Text style={styles.secondText}>¡Debes aceptar una orden nueva!</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Nuevas')}>
          <Text style={styles.buttonText}>IR A NUEVAS</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 100,
    marginTop: 10
  },
  warningIcon: {
    marginTop:10
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 30,
    width: 113,
    height: 36,
    backgroundColor: '#148b97',
    borderRadius: 5,
    elevation:3,
    shadowColor:'black',
    shadowOffset: {width:0, height:3},
    shadowOpacity:0.1,
    shadowRadius:2
  },
  buttonText: {
    color:'#FFFFFF',
    fontFamily:'roboto',
    textAlign:'center',
    fontSize: 14,
  }
})