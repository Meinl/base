import React from 'react';
import { Text, View, Switch, Alert } from 'react-native';
import { connect } from 'react-redux'
import { handleTurn } from './turnoActions'

class Turno extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      switchValue: props.turn
    }
  }

  _handleToggleTurn = () => {
    if (this.state.switchValue === 1) {
      this.props.dispatch(handleTurn(0, () => {
        Alert.alert('Turno',`Su turno ha sido ${!this.state.switchValue ? 'encendido' : 'apagado'}`)
      }))
    }
    else {
      this.props.dispatch(handleTurn(1, () => {
        Alert.alert('Turno',`Su turno ha sido ${!this.state.switchValue ? 'encendido' : 'apagado'}`)
      }))
    }
  }  

  render(){
    return(
      <Switch
        onValueChange={this._handleToggleTurn}
        value={this.state.switchValue}
      />
    )
  }
}

export default connect()(Turno)