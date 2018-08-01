import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,
} from 'react-native'
import NoOrders from './NoOrders'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import { getDateMD } from '../utils/helpers'

const { width, height } = Dimensions.get('window')

class OrderList extends Component {
   render () {
    /*if(this.props.waiting.length === 0)
      return <NoOrders/>
    else */
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
          sections={[
            { title: 'Title1', data: ['item1', 'item2'] },
            { title: 'Title2', data: ['item3', 'item4'] },
            { title: 'Title3', data: ['item5', 'item6'] },
          ]}
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
  const orders = Object.keys(state.orders.list).filter(item => state.orders.list[item].status.event_code === 'WAI').map((item) => state.orders.list[item])
  return {
    history: [
      ...new Set(orders
          .map(({ info: { datetime } }) => getDateMD(datetime))
        )
    ].map((title) => (
      {
        title,
        data: orders.filter(({ info: { datetime } }) => getDateMD(datetime) === title)
      }
    ))
  }
}

export default connect(mapStateToProps)(OrderList)