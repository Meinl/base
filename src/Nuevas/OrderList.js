import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList, 
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'

const { width, height } = Dimensions.get('window')

class OrderList extends Component {
   render () {
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
            {title: '30, Jueves, Junio', data: this.props.waiting}
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
  return {
    waiting: Object.keys(state.orders).filter(item => state.orders[item].status.event_code === 'WAI').map((item) => state.orders[item])
  }
}

export default connect(mapStateToProps)(OrderList)