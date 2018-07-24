import React from 'react';
import { Text, View, Switch, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { handleTurn } from './turnoActions'

class Turno extends React.Component {
    
  _handleToggleTurn = async () => {
    await AsyncStorage.multiGet(['username', 'password'])
    .then(userData => {
      if (this.props.turn === true) {
        this.props.dispatch(handleTurn(userData[0][1], userData[1][1], false))
      }
      else if(this.props.turn === false) {
        this.props.dispatch(handleTurn(userData[0][1], userData[1][1], true))
      }
    })
  }

  render(){
    return(
      <Switch
        onValueChange={this._handleToggleTurn}
        value={this.props.turn}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    turn: state.user.turn
  }
}

export default connect(mapStateToProps)(Turno)