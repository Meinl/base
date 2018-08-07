import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView, 
  TouchableOpacity,  
} from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { getTime, getDateMD } from '../utils/helpers'

class OrderDetail extends Component {  
  render () {
    const order = this.props.navigation.state.params
    console.log(order)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{borderBottomColor:'#ececec', borderBottomWidth:1}}>
            <View style={{padding:15, justifyContent:'flex-start'}}>
              <View style={styles.acceptedLabel}>
                <Text style={{color:'white', fontFamily:'roboto', textAlign:'center', textAlignVertical:'center', paddingHorizontal:10, paddingVertical:3, fontSize:12}}>aceptada</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontFamily:'roboto', color:'#3b3d3d', fontSize:14}}>ID orden: {order.service_id}</Text>
              </View>
            </View>
          </View>
          <View style={{borderBottomColor:'#ececec', borderBottomWidth:1}}>
            <View style={{padding:15, justifyContent:'flex-start', flexDirection:'row'}}>
              <View style={{alignItems:'center', alignSelf:'flex-start'}}>
                <Text style={{fontFamily:'roboto', color:'#9d9e9e', fontSize:12}}>Ruta</Text>
                <View style={{width:15, height:15, borderColor:'#3b3d3d', borderRadius:7.5, borderWidth:2, marginTop:16}}></View>
                <View style={{width:7, height:7, backgroundColor:'#d8d8d8', borderRadius:3.5, marginTop:14}}></View>
                <View style={{width:7, height:7, backgroundColor:'#d8d8d8', borderRadius:3.5, marginTop:14}}></View>
                <View style={{width:7, height:7, backgroundColor:'#d8d8d8', borderRadius:3.5, marginTop:14}}></View>
                <View style={{width:7, height:7, backgroundColor:'#d8d8d8', borderRadius:3.5, marginTop:14}}></View>
                <View style={{width:7, height:7, backgroundColor:'#d8d8d8', borderRadius:3.5, marginTop:14}}></View>
                <View style={{width:7, height:7, backgroundColor:'#d8d8d8', borderRadius:3.5, marginTop:14}}></View>
                <MaterialCommunityIcons name='map-marker-outline' size={24} color="#3b3d3d" style={{marginTop:14}}/>
              </View>
              <View style={{flex:1}}>
                <View style={{flexDirection:'row-reverse'}}>
                  <Text style={{fontFamily:'roboto', color:'#3b3d3d', fontSize:14}}>{getDateMD(order.info.datetime)}</Text>
                </View>
                <View style={{marginTop:13.5, paddingLeft:10}}>
                  <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <MaterialCommunityIcons name='clock' size={16} color="#777879" style={{opacity:0.5}}/>
                    <Text style={{fontFamily:'roboto-medium', color:'#3b3d3d', fontSize:14, paddingLeft:10}}>{getTime(order.info.datetime)} hrs</Text>
                  </View>
                  <View style={{marginTop:4}}>
                    <Text style={{color:'#3b3d3d', fontSize:22, fontFamily:'roboto-bold'}}>{order.info.origin.name}</Text>
                    <Text style={{color:'#3b3d3d', fontSize:16, fontFamily:'roboto-italic', marginTop:4}}>Constanera center, costado por calle Andrés Bello</Text>
                  </View>
                  <View style={{marginTop:41}}>
                    <Text style={{color:'#9d9e9e', fontSize:22, fontFamily:'roboto-bold'}}>Destino</Text>
                    <Text style={{color:'#9d9e9e', fontSize:14, fontFamily:'roboto', marginTop:4}}>Esta información será visible cuando se inicie el traslado del pasajero</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{padding:20}}>
            <Text style={{fontFamily:'roboto', fontSize:12, color:'#9d9e9e'}}>Observación</Text>
            <Text style={{fontFamily:'roboto', fontSize:14, color:'#5c5d5e', marginTop:10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae mi leo. Mauris pretium nunc facilisis faucibus condimentum.</Text>
          </View>
        </ScrollView>
        <View style={{marginTop:'auto', borderTopColor:'#ececec', borderTopWidth:1}}>
          <View style={{padding:20}}>
            <TouchableOpacity style={{backgroundColor:'#f1ba43', justifyContent:'center', alignItems:'center', borderRadius:5, elevation:1, shadowColor:'black', shadowOffset: {width:0, height:2}, shadowOpacity:0.3, shadowRadius:2}}>
              <Text style={{color:'white', fontSize:16, fontFamily:'roboto', paddingVertical:13}}>En Camino</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex:1
  },
  acceptedLabel: {
    backgroundColor:'#148B97',
    borderRadius:2,
    justifyContent:'center',
    alignItems:'flex-start',
    alignSelf:'flex-start'
  }
})

export default connect()(OrderDetail)