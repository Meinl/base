import React from 'react';
import { Text, View, Switch, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { handleTurn } from './turnoActions'

const { width, height } = Dimensions.get('window')

class Turno extends React.Component {
    
  _handleToggleTurn = () => {
    const { tokenUID } = this.props.user
    if (this.props.turn === true) {
      this.props.dispatch(handleTurn(tokenUID, false))
    }
    else if(this.props.turn === false) {
      this.props.dispatch(handleTurn(tokenUID, true))
    }
  }

  render(){
    return(
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
        <Text>{this.props.turn ? 'En Servicio' : 'Fuera de Servicio'}</Text>
        <Switch
          onValueChange={this._handleToggleTurn}
          value={this.props.turn}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    turn: state.user.turn,
    user: state.user
  }
}

export default connect(mapStateToProps)(Turno)