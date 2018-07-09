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
import { createDrawerNavigator, createStackNavigator, DrawerItems, DrawerActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';
import Turno from './Turno'

const { height, width } = Dimensions.get('window');

// StackNavigator
import Ordenes from './Ordenes'
import Historial from './Historial'

export const OrdenesStack = createStackNavigator({
  Ordenes: { 
    screen: Ordenes,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Órdenes',
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