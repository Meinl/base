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

class Nuevas extends Component {
  
  render () {
    return (
      <View style={styles.container}>
        <OrderList {...this.props.newOrders}/>
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

function mapStateToProps(state) {
  return {
    newOrders: state.newOrders
  }
}

export default connect(mapStateToProps)(Nuevas)