import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage, Image, Text, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Expo ,{ Facebook } from 'expo';

import Confirm from '../components/Confirm';

// Make a component
class LoginScreen extends Component {
  state = {
    email: null,
    password: null,
    error: ' ',
    loading: false,
    showModal: false,
//
    // token: null,
    google_idToken: null,
    google_accessToken: null,
    status: 'Not Login...'
  };

  onSignIn = async () => {
    const { email, password } = this.state;
    this.setState({ error: ' ', loading: true });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate('TabRouter');
    } catch (err) {
      this.setState({ showModal: true });
    }
  }

  onCreateUser = async () => {
    const { email, password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

//set basic info
      const { currentUser } = firebase.auth();
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      await dbUserid.set({ email });

      this.setState({ showModal: false });
      // this.props.navigation.navigate('AccountStack');
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
        loading: false,
        showModal: false
      });
    }
  }

  onNewUser = () => {
    this.props.navigation.navigate('NewUserScreen');
  }

  onCLoseModal = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
      showModal: false
    });
  }

// google login
// googleLogin = async() =>  {
//   try {
//     const result = await Expo.Google.logInAsync({
//       iosClientId: '863020286473-5bg2lddb9ul0s8v7u3j06j4am5seqdtb.apps.googleusercontent.com',
//       scopes: ['profile', 'email'],
//     });

//     if (result.type === 'success') {
//       return result.accessToken;
//     } else {
//       return {cancelled: true};
//     }
    
//   } catch(e) {
//     console.log('Error when logining Google ...');
//     return {error: true};
//   }
// }

  googleLogin = async () => {
    console.log('Testing google token....');
    let google_idToken = await AsyncStorage.getItem('google_idToken');
    let google_accessToken = await AsyncStorage.getItem('google_accessToken');

    if (google_idToken) {
      console.log('Already having a token...');
      this.setState({ google_idToken, google_accessToken });

    } else {
      console.log('DO NOT having a token...');
      this.doGoogleLogin();
    }
  }

doGoogleLogin = async () => {
    console.log('trying login Google ...');
    let result = await Expo.Google.logInAsync({
      iosClientId: '863020286473-5bg2lddb9ul0s8v7u3j06j4am5seqdtb.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    let google_idToken = 0, google_accessToken = 0;
    console.log('waiting for result ...');
    console.log(`Google Login ${result.type}`);
    if (result.type === 'success') {
      google_idToken = result.idToken;
      google_accessToken = result.accessToken;
    } else {
      return;
    }

    // Save Google Token locally
    console.log(`google_idToken = ${google_idToken}, google_accessToken = ${google_accessToken}`);
    await AsyncStorage.setItem('google_idToken', google_idToken);
    await AsyncStorage.setItem('google_accessToken', google_accessToken);
    await this.setState({ google_accessToken, google_idToken });

    // Firebase Google Token Login
    const credential = firebase.auth.GoogleAuthProvider.credential(google_idToken, google_accessToken);
    console.log(`credential=${credential}`);
    try {
      await firebase.auth().signInWithCredential(credential);
      const { currentUser } = await firebase.auth();
      console.log(`Google currentUser = ${currentUser.uid}`);
      this.props.navigation.navigate('TabRouter');
    } catch (e2) {
      console.log('Firebase Google login fail ...');
      console.log(`error code is ${e2.code}`);
      console.log(`error message = ${e2.message}`);
      await AsyncStorage.removeItem('google_idToken');
      await AsyncStorage.removeItem('google_accessToken');
      return;
    }
  }
//

//FB login
// facebookLogin = async () => {
//     console.log('Testing token....');
//     let token = await AsyncStorage.getItem('fb_token');

//     if (token) {
//       console.log('Already having a token...');
//       this.setState({ token });

//       const response = await fetch(
//         `https://graph.facebook.com/me?access_token=${token}`);
//       this.setState({ status: `Hello ${(await response.json()).name}` });
//       console.log(response);

//     } else {
//       console.log('DO NOT having a token...');
//       this.doFacebookLogin();
//     }
//   };

//   doFacebookLogin = async () => {
//     let { type, token } = await Facebook.logInWithReadPermissionsAsync(
//       '291530571274093',
//       {
//         permissions: ['public_profile'],
//         behavior: 'web'
//       });

//     if (type === 'cancel') {
//       console.log('Login Fail!!');
//       return;
//     }

//     await AsyncStorage.setItem('fb_token', token);
//     this.setState({ token });
//     const response = await fetch(
//       `https://graph.facebook.com/me?access_token=${token}`);
//     this.setState({ status: `Hello ${(await response.json()).name}` });
//     console.log(response);
//     const credential = firebase.auth.FacebookAuthProvider.credential(token);

//     // Sign in with credential from the Facebook user.
//     try {
//       await firebase.auth().signInWithCredential(credential);
//       const { currentUser } = await firebase.auth();
//       console.log(`currentUser = ${currentUser.uid}`);
//       this.props.navigation.navigate('TabRouter');
//     } catch (err) {

//     }
//   };
//


  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' style={{ marginTop: 30 }} />;
    }

    return (
      <Button
        title='登入'
        backgroundColor='#4AAF4C'
        borderRadius={5}
        fontSize={18}
        onPress={this.onSignIn}
        buttonStyle = {{marginTop:30}}
      />
    );
  }

  async componentDidMount() {
    //   await AsyncStorage.removeItem('fb_token');
    await AsyncStorage.removeItem('google_idToken');
    await AsyncStorage.removeItem('google_accessToken');
  }

  render() {
    const { formStyle, bk, text, textNew, img } = styles;
    return (
      <View style={bk}>
        <StatusBar hidden={true} />
          <Text style={text}>Medical   </Text>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
            <Text style={text}>  Assistent </Text>
            <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD0ElEQVRoQ92a/XHUMBDFdysAKoBUQFIB0AGpgKQCjgqACoAKSCpIqACoAKgA0gFUsMzPWXlknX22bEkZ0H/nkZN9em8/LZX/ZOld4TCzYxF5IiLPReS+iPCb9V1EfovIFxH5pKr8nl3NgZjZUxH5KCKPZq273fBLRN6o6uWh/c2AmBmGAwAgrBs/9WuMDSfvTLGXfbD1MGLqfIqhJkCchSuX0B8R2anqxRJGzOwMRhwQkgMM4AerOhA3BCZYXzllVcWgxcvM8KH3IvLCXwLM4CCqAklAXKoqp7t6mdlORN55MHgWy6wakNIgAnozgwmYwa+OwvMqQGqBiMAQkh+LyFtVxX+kOJDaIDDag8dnl9gRPlcUSAsQI6ycEsWKAWkJwlkJjt8FkSJAWoNwICTNn8HpNwO5CxCRvKxzdNbqoH7rdOSFkOw254lcW8xsO5AEBDYQEklSWVk71/h4/2YgKRNeghPXm4LZBGRMTl4L0T80A+NV8jcR+aGqx1k+MsIEhuNsJ63BmBkZ/bWIfFDV3WIgE0x03Rsn4iGRKrUJM2YGG/zf5QkxJzq1YCay50ZVu05zlpFDckoiCCdUXWZ+UPwvAPR9yUEgS+SU1D7VZWZm5C3yV+fks2V8jpymckFpmUUOTrt8rKoMJro1yoiHNspknJfpRR+dpuRUW2bJwZJ4CSr92gOSgqCyNLNBdJqSUy2ZJSD2+vU9RhJHKlo7rZXZEhBjQJAT8ySmHfdCFMqVUymZLQUxABK1jzgSoa3TYBwZPOk1kVkOiBRIYGNUg1ORac3zOZnlguiBRAUYz65V9bSUnHJltgZEDCT0vzwbJJoScsqIZsysmCiyspTRhV8zwx8Y8e/F5zXSyXknkVl4NQtEzEioJB+EDs+ry652aiCzUHZkMxFsC4z0ve+UDGo9FxEOMcyEs5mYBZIjj7V7owJwNRMpEIovPqiEHPFPyCk+wNTZSYZMufvyuEbUKiWnMSCEvJfxdHutXObeKymnMSDUV2T2/ptDjahVC0Qffl0+wU+6Zn5r6Z5GuRpy2mPEgYTxJ4BOSk4MazIxiFrJ6dENXqjqefS8HyzkJscWIAbSclaIVpQr9CI9mLUyqy2nUWlFpx8cn0cUca9yZeb1E2UHH/w3J7u5SLjHSAKGj/IwM7hCMRPN2Mt7hHMGF+QlvqsPBgVLDMvdMznX8isXMEJVzApGhplSdxXDTx+/So2lXT6LRza5xuXsXzppDFcolvxt7pgAoDoLB31kylLvItE8TCCbbtZFIxZdS6K7XHQtacmJ5OyZZSTnj93l3r8GDxBgLOxf6wAAAABJRU5ErkJggg=='}}
                  style={img} />
          </View>

        <View style={formStyle}>
          <FormLabel labelStyle = {{fontSize:15, color:'white'}}>帳號信箱</FormLabel>
          <FormInput
            placeholder='user@email.com'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            inputStyle = {{color:'white'}}
          />
          <FormLabel labelStyle = {{fontSize:15, color:'white'}}>密碼</FormLabel>
          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            inputStyle = {{color:'white'}}
          />
          {this.renderButton()}
          <FormValidationMessage>{this.state.error}</FormValidationMessage>
        </View>
        <View>
            <Button
              title='以Google帳號登入'
              backgroundColor='#dc4e42'
              borderRadius={5}
              fontSize={18}
              icon={{type:'evilicon', name:'sc-google-plus', size:40}}
              onPress={this.googleLogin}
            />
            {/*<Button
            title='Sign in with Facebook'
            backgroundColor='#39579A'
            icon={{type:'evilicon', name:'sc-facebook', size:40}}
            onPress={this.facebookLogin}
             />*/}
        </View>
        <View style={formStyle}>
           <Text
           style={textNew}
           onPress={this.onNewUser}>
                新使用者?
           </Text>
        </View>
        <Confirm
          title='建立新使用者?'
          visible={this.state.showModal}
          onAccept={this.onCreateUser}
          onDecline={this.onCLoseModal}
        />
      </View>
    );
  }
}

const styles = {
  bk:{
    flex:1,
    justifyContent:'center',
    backgroundColor:"#517fa4"
  },
  formStyle: {
    marginTop: 25
  },
  text:{
    color:'white',
    fontFamily:'Zapfino',
    fontSize:30,
    alignSelf:"center",
    marginBottom:-45
  },
  textNew:{
    color:'white',
    textDecorationLine:'underline',
    alignSelf:"center",
    fontSize:15,
    marginTop:10
  },
  img:{
    width:25,
    height:25,
    marginTop:35
  }
};

export default LoginScreen;