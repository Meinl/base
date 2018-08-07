import React from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  Alert,
  ActionSheetIOS,
  Platform
} from 'react-native'
import { connect } from 'react-redux'

const { height } = Dimensions.get('window')

class OrderItem extends React.Component {

  _setOrderStatus = (status) => {
    switch(status) {
      case 'ACC' : {
        return (
          <View style={styles.acceptedLabel}>
            <Text style={{color:'white', fontFamily:'roboto', textAlign:'center', textAlignVertical:'center', paddingHorizontal:10, paddingVertical:3}}>aceptada</Text>
          </View>
        )
      }
      case 'INP' : {
        return (
          <View style={styles.inProgessLabel}>
            <Text style={{color:'white', fontFamily:'roboto', textAlign:'center', textAlignVertical:'center', paddingHorizontal:10, paddingVertical:3}}>en proceso</Text>
          </View>
        )
      }
    }
  }

  render() {
    const { info, service_id, status } = this.props
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', this.props)}>
        <View style={styles.careers}>
          <View style={{paddingTop:15, paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontSize:12, color:'#3b3d3d', fontFamily:'roboto'}}>ID orden: {service_id}</Text>
            {this._setOrderStatus(status.event_code)}
          </View>
          <View style={{paddingVertical:10, paddingHorizontal:15, flexDirection:'row', flex:1, alignItems:'center'}}>
            <View style={{width:10, justifyContent:'center'}}>
              <View style={{backgroundColor:'#148B97', height:10, width:10, borderRadius:5, alignSelf:'center', position:'relative'}}></View>
              <View style={{backgroundColor:'transparent', height:16, width:16, borderRadius:8, borderWidth:1,borderColor:'#148B97', alignSelf:'center', position:'absolute'}}></View>
            </View>
            <View style={{paddingLeft:15}}>
              <Text style={{fontSize:16, fontFamily:'roboto', color:'#3B3D3D'}}>{info.origin.name}</Text>
              <Text style={{fontSize:16, fontFamily:'roboto-bold', color:'#3B3D3D'}}>{info.datetime.time} hrs</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  },
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
  },
  acceptedLabel: {
    backgroundColor:'#148B97',
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
  },
  inProgessLabel: {
    backgroundColor:'#eeae01',
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
  }
})

export default connect()(OrderItem)