import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Switch,
  Dimensions
} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator, DrawerItems, DrawerActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';
import Turno from '../Turno/Turno'

const { height, width } = Dimensions.get('window');

import AuthLoadingScreen from '../Auth/Auth'
import Login from '../Auth/Login'
import Recovery from '../Auth/Recovery'

// StackNavigator
import Nuevas from '../Nuevas/Nuevas'
import Aceptadas  from '../Aceptadas/Aceptadas'
import Historial from '../Historial/Historial'


export const TabStack = createMaterialTopTabNavigator({
  Nuevas: {
    screen: Nuevas
  },
  Aceptadas: {
    screen: Aceptadas
  }
},{
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor:'#148B97',
    upperCaseLabel: false,
    inactiveTintColor: '#D4D5D5',
    tabStyle: {
      paddingTop:25,
      paddingLeft:20,
      width: 'auto',
    },
    style: {
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 22,
      fontFamily:'roboto-bold',
    },
    indicatorStyle: {
      opacity: 0
    }
  }
})

export const OrdenesStack = createStackNavigator({
  Home: { 
    screen: TabStack,
    navigationOptions: ({ navigation }) => ({
      //headerTitle: 'Órdenes',
      headerLeft: 
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical:10 }}>
          <Ionicons name= 'ios-menu-outline' size={30} color="#000" />
        </View>
      </TouchableOpacity>,
      headerRight: 
      <TouchableOpacity
        onPress={() => {}}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical:10 }}>
          <Ionicons name= 'ios-notifications-outline' size={28} color="#000" />
        </View>
      </TouchableOpacity>,
      headerStyle:{
        elevation:0,
        backgroundColor:'white',
        borderBottomColor:'transparent'
      }
    })
  }
},{
  cardStyle:{
    backgroundColor:'white'
  },
})

export const HistorialStack = createStackNavigator({
  Historial: { 
    screen: Historial,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Historial',
      headerLeft: 
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical:10 }}>
          <Ionicons name= 'ios-menu-outline' size={30} color="#000" />
        </View>
      </TouchableOpacity>
    })
  }
})

export const AuthStack = createStackNavigator({
  Login:{
    screen: Login,
    navigationOptions: () => ({
    })
  },
  Recovery:{
    screen: Recovery
  }
},{
  headerMode:'none',
  cardStyle:{
    backgroundColor:'white'
  },
})


//DrawerNavigator
export const Drawer = createDrawerNavigator({
  Ordenes: { 
    screen: OrdenesStack,
    navigationOptions: () => ({
      title:'Órdenes'
    }),
  },
  Historial: { 
    screen: HistorialStack,
    navigationOptions: () => ({
      title:'Historial'
    }),
  }
}, {
  drawerWidth: width,
  contentComponent: (props) =>
    <View style={{flex:1}}>
      <View style={{flex:1, padding:20}}>
        <View style={{justifyContent:'center', alignItems:'flex-start', height:height/3}}>
          <View style={{flexDirection:'row', justifyContent:'space-between' , flex:1, alignItems:'flex-end'}}>
            <Text style={styles.iniciales}>DC</Text>
            <TouchableOpacity style={{alignSelf:'flex-start', paddingTop:10}}
              onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name= 'ios-close' size={50} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameMail}>Diego Carneiro</Text>
          <Text style={styles.nameMail}>dc@beenary.cl</Text>
          <Text style={styles.idSmall}>ID Conductor</Text>
          <Text style={{fontFamily:'roboto', fontSize:16, paddingBottom:10}}>711</Text>
        </View>
        <View style={{
          height:height/10, 
          flexDirection:'row', 
          justifyContent:'space-between', 
          alignItems:'center', 
          borderBottomColor:'#CACACA',
          borderBottomWidth:0.3,
          borderTopColor:'#CACACA', 
          borderTopWidth:0.3
          }}>
          <Text>En Servicio</Text>
          <Turno/>
        </View>
        <DrawerItems {...props}
          activeBackgroundColor='transparent'
          getLabel = {(route) => (
            <View style={styles.button}>
              <Text style={styles.buttonText}>{props.getLabel(route)}</Text>
              <Ionicons name= 'ios-arrow-forward-outline' size={30} color="#000" />
            </View>
          )}
        />
        <TouchableOpacity style={{paddingTop:25, borderTopColor:'#CACACA', borderTopWidth:0.3}}>
          <Text style={{color:'red'}}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Text style={{color:'white', fontSize:18}}>Llamar a Central</Text>
      </TouchableOpacity>
    </View>
})

export const SwitchStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: Drawer,
  Auth: AuthStack,
},
{
  initialRouteName: 'AuthLoading',
})

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