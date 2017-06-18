import Expo from 'expo';
import App from './src/App';

Expo.registerRootComponent(App);


//reactJS101
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import Main from './src/components/Main/Main';

// class ReactNativeFirebaseMotto extends Component {
//   render() {
//     return (
//       <Main />
//     );
//   }
// }

// AppRegistry.registerComponent('ReactNativeFirebaseMotto', () => ReactNativeFirebaseMotto);


// //groceries
// import React, { Component } from 'react'
// import { Provider } from 'react-redux'
// import App from './src/containers/App'
// import configureStore from './src/store/configureStore'

// const store = configureStore()

// class Groceries extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
//   }
// }

// // AppRegistry.registerComponent('Groceries', () => Groceries)

// Expo.registerRootComponent(Groceries);