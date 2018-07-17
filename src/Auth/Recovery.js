import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  Easing,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default class Recovery extends React.Component {
  constructor() {
    super()
    this.animatedValue = new Animated.Value(0)
  }
    static navigationOptions = {
      title: 'Please sign in',
    };

    componentDidMount() {
      this._logoAppear()
    }

    _logoAppear = () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 800,
          easing: Easing.linear
        }
      ).start(() => this._logoAppear())
    }
  
    render() {
      const opacity = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 1]
      })
      const move = this.animatedValue.interpolate({
        inputRange: [0, 0.3, 0.5, 0.7, 1],
        outputRange: [-50, -35, -25, -15, 0]
      })
      return (
        <View style={styles.container}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{paddingBottom:15}}>Ingresa tu correo para recuperar tu contraseña.</Text>
            <View style={{width:width-60, height:50, elevation:3, backgroundColor:'white'}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10}}>
                <TextInput
                  style={{width:'auto', height:50, flex:1}}
                  underlineColorAndroid='transparent'
                  placeholder="Mail usuario"
                  onChangeText={(text) => this.setState({text})}
                />
                <Ionicons style={{width:30, textAlign:'center'}} name='ios-close-outline' size={30} color="#CACACA" />
              </View>
            </View>
            <TouchableOpacity 
            onPress={this._signInAsync}
            style={{width:width-60, marginTop:30, justifyContent:'center', alignItems:'center', backgroundColor:'#148B97', height:60, borderRadius:5, elevation:2}}>
              <Text style={{color:'white', fontSize:18}}>Recuperar contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
}

  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    logo: {
      fontSize: 72,
      padding:0,
      margin:0,
      fontWeight:'bold'
    }
  })