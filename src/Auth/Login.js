import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { handleUser } from '../User/userActions'
import { handleNewOrdersList } from '../Nuevas/nuevasActions'

import { Ionicons } from '@expo/vector-icons'

//Variable que obtiene las dimensiones de la pantalla del dispositivo
const { width, height } = Dimensions.get('window')

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      secureEntry: true,
      username:'dc@beenary.cl',
      password:'123456'
    }
    this.animatedValue = new Animated.Value(0) //Se inicia el valor de la animación en 0
    this.toScale = new Animated.Value(1)
  }

  componentDidMount() {
    this._logoAppear() //Se ejecuta la animación del logo
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    Animated.timing(this.toScale, {
      duration: 400,
      toValue: 0.7,
      useNativeDriver: true,
    }).start()
  };

  _keyboardDidHide = (event) => {
    Animated.timing(this.toScale, {
      duration: 400,
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  //Se define la función timing para la animación del logo
  _logoAppear = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.linear
    }).start()
  }

  _login = (username, password) => {
    this.props.dispatch(handleUser(username, password, () => {
      this._signInAsync(username, password)
    }))
    //this.props.dispatch(handleNewOrdersList())
  }

  _togglePassword = () => {
    this.setState(prevState => ({
      secureEntry: !prevState.secureEntry
    }))
  }

  _clearInput = () => {
    this.setState({
      username:''
    })
  }

  //Función de navegación a la pantalla de recuperar contraseña
  _recoveryPass = () => {
    this.props.navigation.navigate('Recovery')
  }

  //Función que guardar el token de login de usuario en AsyncStorage
  _signInAsync = async (username, password) => {
    await AsyncStorage.multiSet([['username', username], ['password', password]])
    this.props.navigation.navigate('App')
  }
  
  render() {
    //Variable que controla la animación de la opacidad del logo
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    })
    //Variable que controla el movimiento horizontal del logo
    const move = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-30, -15, 0]
    })
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
          <View>
            <View style={styles.logoImage}>
              <Animated.Image
                style={{transform:[{translateY:move}]}} 
                source={require('../../assets/images/logo_moov_login.png')} 
              />
            </View>
          </View>
          <Animated.View style={{opacity}}>
            <Text style={styles.logoText}>Tu sistema de gestión y órdenes de viajes</Text>
          </Animated.View>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.inputsContainer}>
            <View style={styles.userInputsContainer}>
              <TextInput
                ref={ input => { this.email = input }}
                style={styles.userInputs}
                value={this.state.username}
                underlineColorAndroid='transparent'
                placeholder="Mail usuario"
                autoCapitalize='none'
                autoCorrect={false} 
                keyboardType='email-address'
                onChangeText={(text) => this.setState({username: text})}
              />
              <TouchableOpacity
                onPress={this._clearInput}
              >
                <Ionicons 
                  style={styles.iconInput} 
                  name='ios-close-outline' 
                  size={30} 
                  color="#CACACA" 
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.userInputsContainer, {borderTopWidth:1, borderTopColor:'#ECECEC'}]}>
              <TextInput
                style={styles.userInputs}
                value={this.state.password}
                underlineColorAndroid='transparent'
                placeholder="Contraseña"
                autoCapitalize='none'
                autoCorrect={false} 
                secureTextEntry={this.state.secureEntry}
                onChangeText={(text) => this.setState({password: text})}
              />
              <TouchableOpacity
                onPress={this._togglePassword}
              >
                <Ionicons 
                  style={styles.iconInput} 
                  name='ios-eye' size={30} 
                  color="#CACACA"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
            disabled={this.state.username === '' || this.state.password === ''}
            onPress={() => this._login(this.state.username, this.state.password)}
            style={styles.submitButton}
          >
            <Text style={{
              color: 'white',
              opacity: (this.state.username === '' || this.state.password === '') ? .5 : 1,
              fontSize:18}}>{this.props.isLoading ? <ActivityIndicator color='#FFF' /> : 'Entrar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity 
            style={styles.forgotPasswordText} 
            onPress={this._recoveryPass}
          >
            <Text style={{color:'#148B97', fontSize:16}}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
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
  },
  logoContainer: {
    flex:2, 
    justifyContent:'center', 
    alignItems:'center'
  },
  logoImage: {
    alignItems:'flex-end', 
    justifyContent:'flex-end'
  },
  logoText: {
    width:width/2, 
    textAlign:'center', 
    paddingTop:20, 
    fontSize:18, color:'gray'
  },
  loginContainer:{
    flex:1, 
    justifyContent:'flex-end', 
    alignItems:'center'
  },
  errorMessage:{
    paddingBottom:15
  },
  inputsContainer:{
    width:width-60, 
    height:100, 
    elevation:3, 
    backgroundColor:'white',
    shadowColor:'black',
    shadowOffset: {width:0, height:3},
    shadowOpacity:0.1,
    shadowRadius:2,
  },
  userInputsContainer:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    paddingHorizontal:10
  },
  userInputs:{
    flex:1,
    width:'auto', 
    height:50
  },
  iconInput:{
    width:30, 
    textAlign:'center'
  },
  submitButton:{
    width:width-60,
    marginTop:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#148B97',
    height:60,
    borderRadius:5,
    elevation:2,
    shadowColor:'black',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.1,
    shadowRadius:2,
  },
  forgotPasswordContainer:{
    justifyContent:'flex-end',
    marginTop:50
  },
  forgotPasswordText:{
    paddingBottom:20, 
    width:width-60, 
    justifyContent:'center', 
    alignItems:'center'
  }
})

function mapStateToProps(state) {
  return {
    email: state.user.email,
    isLoading: state.user.isLoading
  }
}

export default connect(mapStateToProps)(Login)