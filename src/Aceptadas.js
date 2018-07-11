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

export default class Aceptadas extends Component {

  _handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.97
    }).start()
    
  }

  _handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 100
    }).start()
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1)
    //setTimeout(() => {this.scrollView.scrollTo({x: -10}) }, 1) // scroll view position fix
  }
  
  render () {
    const animatedStyle = {
      transform: [{scale: this.animatedValue}]
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback
            onPressIn={this._handlePressIn}
            onPressOut={this._handlePressOut} 
          >
            <Animated.View style={[styles.careers, animatedStyle]}>
              <Text>Carrera 1</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <View style={styles.careers}>
            <Text>Carrera 2</Text>
          </View>
          <View style={styles.careers}>
            <Text>Carrera 3</Text>
          </View>
          <View style={styles.careers}>
            <Text>Carrera 4</Text>
          </View>
          <View style={styles.careers}>
            <Text>Carrera 5</Text>
          </View>
          <View style={styles.careers}>
            <Text>Carrera 6</Text>
          </View>
        </ScrollView>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
  },
  careers: {
    backgroundColor:'white',
    elevation:1,
    height:height/4,
    margin:10,
    borderColor:'#CACACA',
    borderWidth:0.5,
    borderRadius:2
  },
  text: {
    margin: 10,
    fontSize: 22,
    //fontWeight: 'bold',
  }
})
