import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,
  TouchableOpacity
} from 'react-native'
import NoOrders from './NoOrders'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import { getDateMD } from '../utils/helpers'

const { width, height } = Dimensions.get('window')

class OrderList extends Component {
   render () {
    if(this.props.waiting.length === 0)
      return <NoOrders/>
    else 
      return (
        <SectionList
          stickySectionHeadersEnabled={true}
          renderItem={({item, index, section}) =>
              <OrderItem {...item}/>
            }
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.sectionHeader}>
              <Text style={{color:'#777879', fontSize:16, fontFamily:'roboto-bold'}}>{title}</Text>
            </View>
          )}
          sections={this.props.waiting}
          keyExtractor={(item, index) => item + index}
        />
      )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    justifyContent:'center',
    alignItems:'center',
    height:55, paddingBottom:10,
    paddingTop:20, backgroundColor:'white',
    marginBottom:3,
    elevation:2,
    shadowColor:'black',
    shadowOffset: {width:0, height:3},
    shadowOpacity:0.1,
    shadowRadius:2,
  }
})

function mapStateToProps(state) {
  if (state.orders.list !== null) {
    const orders = Object.keys(state.orders.list).filter(item => state.orders.list[item].status.event_code === 'WAT').map((item) => state.orders.list[item])
    const group_to_values = orders.reduce(function (obj, item) {
      obj[item.info.datetime] = obj[item.info.datetime] || []
      obj[item.info.datetime].push(item)
      return obj
    }, {})
  
    const groups = Object.keys(group_to_values).map(function (key) {
        return {title: getDateMD(key), data: group_to_values[key]}
    })
    return {
      waiting: groups
    }
  }
  else
  return {
    waiting: []
  }
}

export default connect(mapStateToProps)(OrderList)