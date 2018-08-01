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
import { Ionicons } from '@expo/vector-icons'
import DrawerComponent from './DrawerComponent'
import BadgeIcon from './BadgeIcon'

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
    screen: Nuevas,
    navigationOptions: () => ({
      tabBarIcon: <BadgeIcon/>
    })
  },
  Aceptadas: {
    screen: Aceptadas
  }
},{
  swipeEnabled: true,
  tabBarOptions: {
    showIcon:true,
    activeTintColor:'#148B97',
    upperCaseLabel: false,
    inactiveTintColor: '#D4D5D5',
    tabStyle: {
      paddingTop:25,
      paddingLeft:20,
      width: 'auto',
      flexDirection:'row',
    },
    iconStyle: {
      position:'absolute',
      zIndex:1,
      right:5
    },
    style: {
      backgroundColor: 'transparent'
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

export const HistorialTabStack = createMaterialTopTabNavigator({
  Historial: {
    screen: Historial
  }
},{
  tabBarOptions: {
    activeTintColor:'#148B97',
    upperCaseLabel: false,
    inactiveTintColor: '#D4D5D5',
    tabStyle: {
      paddingTop:25,
      paddingLeft:20,
      width: 'auto',
      flexDirection:'row',
    },
    style: {
      backgroundColor: 'transparent'
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

export const HistorialStack = createStackNavigator({
  Historial: { 
    screen: HistorialTabStack,
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
    <DrawerComponent {...props} />
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