import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions
} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createMaterialTopTabNavigator, DrawerItems, DrawerActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';
import Turno from './Turno'

const { height, width } = Dimensions.get('window');

// StackNavigator
import Nuevas from './Nuevas'
import Aceptadas  from './Aceptadas'
import Historial from './Historial'

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
    inactiveTintColor: '#D4D5D5',
    tabStyle: {
      paddingTop:25,
      width: 155,
    },
    style: {
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 20,
      fontWeight:'bold'
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
        <View style={{ padding: 10 }}>
          <Ionicons name= 'ios-menu-outline' size={30} color="#000" />
        </View>
      </TouchableOpacity>,
      headerStyle:{
        elevation:0
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
        <View style={{ padding: 10 }}>
          <Ionicons name= 'ios-menu-outline' size={30} color="#000" />
        </View>
      </TouchableOpacity>
    })
  }
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
      <View style={{flex:1}}>
        <View style={{justifyContent:'center', alignItems:'center',backgroundColor: 'tomato', height:height/4}}>
          <Text>Header</Text>
        </View>
        <DrawerItems {...props}/>
      </View>
      <View style={{
        height:height/14, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        borderTopColor:'#CACACA', 
        borderTopWidth:0.3,
        paddingHorizontal:15}}>
        <Text>Turno</Text>
        <Turno/>
      </View>
    </View>
})