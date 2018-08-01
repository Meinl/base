import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,  
} from 'react-native'
import OrderList from './OrderList'
import { connect } from 'react-redux'

class Aceptadas extends Component {  
  render () {
    return (
      <View style={styles.container}>
        <OrderList navigation={this.props.navigation}/>
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

export default connect()(Aceptadas)