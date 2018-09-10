import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import middleware from './src/middlewares'
import LoadingAssets from './src/loading/LoadingAssets'

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <LoadingAssets/>
      </Provider>
    )
  }
}
