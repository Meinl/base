import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
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
        <SectionList
          stickySectionHeadersEnabled={false}
          renderItem={({item, index, section}) => 
          <TouchableWithoutFeedback
            onPressIn={this._handlePressIn}
            onPressOut={this._handlePressOut} 
          >
            <Animated.View style={[styles.careers, animatedStyle]}>
              <View style={{padding:10, flexDirection:'row', flex:1}}>
                <View style={{alignItems:'center'}}>
                  <Text>Foto</Text>
                </View>
                <View>
                  <Text>Dirección</Text>
                  <Text>Hora</Text>
                </View>
              </View>
              <View style={{flex:1, justifyContent:'flex-end', flexDirection:'row', padding:10}}>
                <Text style={{alignSelf:'flex-end'}}>RECHAZAR</Text>
                <Text style={{alignSelf:'flex-end'}}>ACEPTAR</Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>}
          renderSectionHeader={({section: {title}}) => (
            <View style={{justifyContent:'center', alignItems:'center', height:55, paddingBottom:10, paddingTop:20, backgroundColor:'white'}}>
              <Text style={{color:'#148B97', fontWeight:'bold', fontSize:16}}>{title}</Text>
            </View>
          )}
          sections={[
            {title: '30, Jueves, Junio', data: ['item1', 'item2']},
            {title: '01, Viernes, Julio', data: ['item3', 'item4']},
            {title: '02, Sábado, Julio', data: ['item5', 'item6']},
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex:1
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
