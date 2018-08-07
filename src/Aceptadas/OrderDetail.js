import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,  
} from 'react-native'
import { connect } from 'react-redux'

class OrderDetail extends Component {  
  render () {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
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

export default connect()(OrderDetail)