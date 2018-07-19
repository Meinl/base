import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import middleware from './src/middlewares'
import Index from './Index'

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}
