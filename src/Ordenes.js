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

export default class Ordenes extends Component {

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
        <View style={{marginBottom:10}}>
          <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView }}
          //pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal= {true}
          decelerationRate={0}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          /*contentInset={{
            top: 0,
            left: 10,
            bottom: 0,
            right: 10,
          }}*/>
            <View style={styles.view}>
              <Text style={styles.text}>{ new Date().getDate() } Jul</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>{ new Date().getDate() + 1 }</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>{ new Date().getDate() + 2 }</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>{ new Date().getDate() + 3 }</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>{ new Date().getDate() + 4 }</Text>
            </View>
          </ScrollView>
        </View>
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
  },
  view: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width / 4,
    margin: 10,
    height: width / 4,
    borderColor:'#CACACA',
    borderWidth:1,
    borderRadius: 1,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: 2 },
    elevation:1,
    //paddingHorizontal : 30
  },
})
