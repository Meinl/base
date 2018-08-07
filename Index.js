import React from 'react'
import { SwitchStack } from './src/Menu/navigators'
import { 
  AppLoading, 
  Asset, 
  Font, 
  Icon,
} from 'expo'

export default class Index extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo_moov_login.png'),
        //require('./assets/images/logo_moov_login.png'), ***** PROD ******
      ]),
      Font.loadAsync({
        // Imágenes e íconos
        ...Icon.Ionicons.font,
        ...Icon.MaterialCommunityIcons.font,
        'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    console.warn(error);
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <SwitchStack />
      )
    }
  }
}
