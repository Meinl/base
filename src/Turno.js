import React from 'react';
import { Text, View, Switch, Alert } from 'react-native';

export default class Turno extends React.Component {
  state = {
    switchValue: false
  }

  _handleToggleSwitch = () => {
    this.setState(state => ({
      switchValue: !state.switchValue,
    }))
    Alert.alert('Turno',`Su turno ha sido ${!this.state.switchValue ? 'encendido' : 'apagado'}`)
  }
  

  render(){
    return(
      <Switch
        onValueChange={this._handleToggleSwitch}
        value={this.state.switchValue}
      />
    )
  }
}