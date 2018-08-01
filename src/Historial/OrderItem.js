import React from 'react'
import {
  View,
  Text,
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

const { height } = Dimensions.get('window')

class OrderItem extends React.Component {

  render() {
    return (
      <View style={styles.careers}>
        <View style={{padding:15, flex:1}}>
          <View>
            <Text style={{fontSize:12, color:'#3b3d3d', fontFamily:'roboto'}}>ID orden</Text>
          </View>
          <View>
            <View style={{flexDirection:'row', marginTop:8}}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{backgroundColor:'#148B97', height:10, width:10, borderRadius:5, alignSelf:'center', position:'relative'}}></View>
                <View style={{backgroundColor:'transparent', height:16, width:16, borderRadius:8, borderWidth:1,borderColor:'#148B97', alignSelf:'center', position:'absolute'}}></View>
              </View>
              <View style={{marginLeft:10}}>
                <Text style={{color:'#3b3d3d', fontSize:16, fontFamily:'roboto'}}>Las condes....</Text>
              </View>
            </View>
            <View style={{width:10, justifyContent:'center', alignItems:'center', marginVertical:5}}>
              <View style={{backgroundColor:'#d4d5d5', height:5, width:5, borderRadius:2.5}}></View>
              <View style={{backgroundColor:'#d4d5d5', height:5, width:5, borderRadius:2.5, marginTop: 5}}></View>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{backgroundColor:'#148B97', height:10, width:10, borderRadius:5, alignSelf:'center', position:'relative'}}></View>
                <View style={{backgroundColor:'transparent', height:16, width:16, borderRadius:8, borderWidth:1,borderColor:'#148B97', alignSelf:'center', position:'absolute'}}></View>
              </View>
              <View style={{marginLeft:10}}>
                <Text style={{color:'#3b3d3d', fontSize:16, fontFamily:'roboto'}}>Las condes....</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop:'auto', borderTopColor:'#fafafa', borderTopWidth:1}}>
          <View style={{padding:15}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{fontSize:12, color:'#9d9e9e', fontFamily:'roboto'}}>Hora</Text>
              <Text style={{fontSize:12, color:'#9d9e9e', fontFamily:'roboto'}}>Total</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{fontSize:16, color:'#3b3d3d', fontFamily:'roboto'}}>14:50</Text>
              <Text style={{fontSize:16, color:'#3b3d3d', fontFamily:'roboto'}}>$3250</Text>
            </View>
          </View>
        </View>
      </View>
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
    height:height/3.5,
    marginHorizontal:20,
    marginVertical: 10,
    borderColor:'#CACACA',
    borderWidth:0.5,
    borderRadius:2,
    flex:1
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
  acceptButton: {
    alignSelf:'flex-end', 
    backgroundColor:'#148B97',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    elevation:3,
    shadowColor:'black',
    shadowOffset: {width:0, height:3},
    shadowOpacity:0.1,
    shadowRadius:2
  }
})

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(OrderItem)