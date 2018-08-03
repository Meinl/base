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
          this.props.notification > 0 ? 
            <Animated.View style={[{ backgroundColor: '#95cc59', borderRadius: 4, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }, animatedStyle]}>
              <Text style={{ color: 'white', fontSize:12, fontFamily:'roboto-bold' }}>{this.props.notification}</Text>
            </Animated.View>
          : null
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
    return {
      notification: state.orders.notification,
    }
  }

export default connect(mapStateToProps)(BadgeIcon)
