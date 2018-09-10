import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { DrawerActions } from 'react-navigation'
import { connect } from 'react-redux'

import Turno from '../Turno/Turno'

const { width, height } = Dimensions.get('window')

class Header extends React.Component {
  render() {
    const { user } = this.props
    return (
      <View>
        <View style={{justifyContent:'center', alignItems:'flex-start', height:height/3}}>
          <View style={{flexDirection:'row', justifyContent:'space-between' , flex:1, alignItems:'flex-end'}}>
            <Text style={styles.iniciales}>{user.first_name.charAt(0)}{user.last_name.charAt(0)}</Text>
            <TouchableOpacity style={{alignSelf:'flex-start', paddingTop:10}}
              onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name= 'ios-close' size={50} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameMail}>{`${user.first_name} ${user.last_name}`}</Text>
          <Text style={styles.nameMail}>{`${user.email}`}</Text>
          <Text style={styles.idSmall}>ID Conductor</Text>
          <Text style={{fontFamily:'roboto', fontSize:16, paddingBottom:10}}>{`${user.id}`}</Text>
        </View>
        <Turno/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iniciales: {
    fontSize:72,
    fontFamily:'roboto-black',
    flex:1
  },
  nameMail:{
    fontSize:16,
    fontFamily:'roboto',
  },
  idSmall:{
    marginTop:15,
    fontSize:12,
    fontFamily:'roboto'
  },
  button:{
    height:height/10,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
  },
  callButton:{
    justifyContent:'center', 
    alignItems:'center', 
    height:60, 
    marginHorizontal:20, 
    marginBottom:10, 
    backgroundColor:'#148B97',
    borderRadius:5,
    elevation:1,
    shadowColor:'black',
    shadowOffset: {width:0, height:5},
    shadowOpacity:0.3,
    shadowRadius:2,
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Header)