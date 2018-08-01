import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,  
} from 'react-native'
import OrderList from './OrderList'
import { resetNotification } from '../Nuevas/nuevasActions'
import { connect } from 'react-redux'

class Nuevas extends Component {  

  componentDidMount() {
    console.log(this.props.navigation)
    this.props.navigation.addListener('willFocus', (route) => {
      if(this.props.orders.notification > 0)
      setTimeout(() => {
        this.props.dispatch(resetNotification())
      }, 10000)
    })
  }

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

function mapStateToProps(state) {
  return {
    orders: state.orders
  }
}

export default connect(mapStateToProps)(Nuevas)