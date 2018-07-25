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
import { handleAddedOrder } from './nuevasActions'

const { width, height } = Dimensions.get('window')

class OrderList extends Component {

  componentDidMount() {
    this.props.dispatch(handleAddedOrder())
  }

   render () {
    return (
        <SectionList
          stickySectionHeadersEnabled={true}
          renderItem={({item, index, section}) => 
            <View style={styles.careers}>
              <View style={{padding:15, flexDirection:'row', flex:1, alignItems:'center'}}>
                <View style={{width:10, justifyContent:'center'}}>
                  <View style={{backgroundColor:'#148B97', height:10, width:10, borderRadius:5, alignSelf:'center', position:'relative'}}></View>
                  <View style={{backgroundColor:'transparent', height:16, width:16, borderRadius:8, borderWidth:1,borderColor:'#148B97', alignSelf:'center', position:'absolute'}}></View>
                </View>
                <View style={{paddingLeft:15}}>
                  <Text style={{fontSize:18, fontFamily:'roboto'}}>{item.info.origin.name}</Text>
                  <Text style={{fontSize:18, fontWeight:'bold', fontFamily:'roboto'}}>{item.info.datetime.time} hrs</Text>
                </View>
              </View>
              <View style={{flex:1, justifyContent:'flex-end', flexDirection:'row', padding:10}}>
                <TouchableOpacity style={{alignSelf:'flex-end', paddingHorizontal:20}}>    
                    <Text style={{fontSize:16, fontFamily:'roboto'}}>RECHAZAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:'flex-end', paddingHorizontal:20}}>
                    <Text style={{fontSize:16, fontFamily:'roboto'}}>ACEPTAR</Text>
                </TouchableOpacity>
              </View>
            </View>}
          renderSectionHeader={({section: {title}}) => (
            <View style={{justifyContent:'center', alignItems:'center', height:55, paddingBottom:10, paddingTop:20, backgroundColor:'white'}}>
              <Text style={{color:'#148B97', fontWeight:'bold', fontSize:16, fontFamily:'roboto'}}>{title}</Text>
            </View>
          )}
          sections={[
            {title: '30, Jueves, Junio', data: this.props.newOrders}
          ]}
          keyExtractor={(item, index) => item + index}
        />
      )
  }
}

const styles = StyleSheet.create({
  careers: {
    backgroundColor:'white',
    elevation:1,
    shadowColor:'black',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.1,
    shadowRadius:2,
    height:height/5.5,
    marginHorizontal:20,
    marginVertical: 10,
    borderColor:'#CACACA',
    borderWidth:0.5,
    borderRadius:2
  },
  text: {
    margin: 10,
    fontSize: 22,
  }
})

function mapStateToProps(state) {
  return {
    newOrders: Object.keys(state.newOrders).map((item) => state.newOrders[item])
  }
}

export default connect(mapStateToProps)(OrderList)