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
import { handleAcceptedOrder, watchStatusOrders } from './nuevasActions'

const { height } = Dimensions.get('window')

class OrderItem extends React.Component {

  _acceptOrder = (service_id) => {
    const { username, password, driverID } = this.props.credentials
    if(Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Si', 'No', 'Cancelar'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        if(buttonIndex === 0) {
          this.props.dispatch(handleAcceptedOrder(username, password, driverID, service_id))
        }
      })
    }
    else {
      Alert.alert(
        'Aceptar nueva orden',
        '¿Seguro que quieres aceptar esta orden?',
        [
          {text: 'No', onPress: () => console.log('Accept: Cancel Pressed'), style: 'cancel'},
          {text: 'Si', onPress: () => console.log('Accept: OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  _rejectOrder = (service_id) => {
    if(Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Si', 'No', 'Cancelar'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        console.log('Reject: ', buttonIndex, service_id)
      })
    }
    else {
      Alert.alert(
        'Rechazar nueva orden',
        '¿Seguro que quieres rechazar esta orden?',
        [
          {text: 'No', onPress: () => console.log('Reject: Cancel Pressed'), style: 'cancel'},
          {text: 'Si', onPress: () => console.log('Reject: OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { info, service_id } = this.props
    return (
      <View style={styles.careers}>
        <View style={{paddingTop:15, paddingLeft:15}}>
          <Text>ID orden: {service_id}</Text>
        </View>
        <View style={{paddingVertical:10, paddingHorizontal:15, flexDirection:'row', flex:1, alignItems:'center'}}>
          <View style={{width:10, justifyContent:'center'}}>
            <View style={{backgroundColor:'#148B97', height:10, width:10, borderRadius:5, alignSelf:'center', position:'relative'}}></View>
            <View style={{backgroundColor:'transparent', height:16, width:16, borderRadius:8, borderWidth:1,borderColor:'#148B97', alignSelf:'center', position:'absolute'}}></View>
          </View>
          <View style={{paddingLeft:15}}>
            <Text style={{fontSize:18, fontFamily:'roboto', color:'#3B3D3D'}}>{info.origin.name}</Text>
            <Text style={{fontSize:18, fontFamily:'roboto-bold', color:'#3B3D3D'}}>{info.datetime.time} hrs</Text>
          </View>
        </View>
        <View style={{flex:1, justifyContent:'flex-end', flexDirection:'row', padding:10}}>
          <TouchableOpacity style={{alignSelf:'flex-end', marginRight:10}} onPress={() => this._rejectOrder(service_id)}>    
              <Text style={{fontSize:16, fontFamily:'roboto', color:'#777879', padding:13}}>RECHAZAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={() => this._acceptOrder(service_id)}>
              <Text style={{fontSize:16, color:'white', fontFamily:'roboto', padding:13}}>ACEPTAR</Text>
          </TouchableOpacity>
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
    height:height/4,
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
    credentials: state.user.credentials
  }
}

function mapDispatchToProps(dispatch) {
  watchStatusOrders(dispatch)
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem)