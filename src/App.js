import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import * as firebase from 'firebase';
import { AppWithNavigationState } from './Router';

//
import { LoginStack, TabRouter } from './Router';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCEUBTP6Stenu85ZhQMu1ZRSwt13cMR_d4",
      authDomain: "medicalassistentapp.firebaseapp.com",
      databaseURL: "https://medicalassistentapp.firebaseio.com",
      projectId: "medicalassistentapp",
      storageBucket: "medicalassistentapp.appspot.com",
      messagingSenderId: "575160671195"
    });
  }

  render() {
    return (
        <Provider store={createStore(reducers)}>
          {/*<TabRouter />*/}
          <LoginStack />
          {/*<AppWithNavigationState />*/}
        </Provider>
    );
  }

}

export default App;


// // Swipe example
// import React, { Component } from 'react';
// import App from './swipe_ex';

// export default App;