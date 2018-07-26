import React from 'react'
import {
  View,
  Animated,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

class BadgeIcon extends React.Component {
  constructor() {
    super()
    this.animatedValue = new Animated.Value(0) //Se inicia el valor de la animación en 0
  }

  componentDidMount() {
    this._NotifiAnimation()
    if(this.props.turn) console.log('existe')
  }

  _NotifiAnimation = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const animatedStyle = {
      transform:[{scale: this.animatedValue}]
    }
    return(
      <View>
        { 
          this.props.turn ? 
            <Animated.View style={[{ backgroundColor: 'red', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }, animatedStyle]}>
              <Text style={{ color: 'white', fontSize:12, fontFamily:'roboto-bold' }}>{this.props.turn ? 1 : 0}</Text>
            </Animated.View>
          : null
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
    return {
      turn: state.user.turn,
    }
  }

export default connect(mapStateToProps)(BadgeIcon)
