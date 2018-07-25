import React from 'react';
import { Text, View, Switch, Alert } from 'react-native';
import { connect } from 'react-redux'
import { handleTurn } from './turnoActions'

class Turno extends React.Component {
    
  _handleToggleTurn = () => {
    const { username, password } = this.props.credentials
    if (this.props.turn === true) {
      this.props.dispatch(handleTurn(username, password, false))
    }
    else if(this.props.turn === false) {
      this.props.dispatch(handleTurn(username, password, true))
    }
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
    turn: state.user.turn,
    credentials: state.user.credentials
  }
}

export default connect(mapStateToProps)(Turno)