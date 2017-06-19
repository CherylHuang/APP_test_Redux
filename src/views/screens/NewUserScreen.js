import React, { Component } from 'react';
import { View, Picker, ActivityIndicator, ScrollView, Text } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, Button, CheckBox } from 'react-native-elements';

const styles = {
  formStyle: {
    marginTop: 50
  },
  pickerStyle:{
    marginTop:-30,
    marginBottom:-30
  },
  textCancel:{
    color:'#bbbbbb',
    textDecorationLine:'underline',
    alignSelf:"center",
    fontSize:15,
    marginTop:30,
    marginBottom:50
  }
};


// Make a component
class NewUserScreen extends Component {
  state = {
    email: null,
    password: null,
    saving: false,
    error: ' ',
  };

  onSaveInfo = async () => {
    const { email, password } = this.state;
    this.setState({ saving: true });
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      
      const { currentUser } = firebase.auth();
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      await dbUserid.set({ email });

      this.props.navigation.navigate('TabRouter');
      this.setState({ saving: false });
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
        saving: false
      });
    }
  }

  renderButton(navigation) {
    if (this.state.saving) {
      return <ActivityIndicator size='large' style={{marginTop:30}} />;
    }

    return (
      <Button
        title='建立並登入'
        backgroundColor='#4AAF4C'
        borderRadius={5}
        fontSize={18}
        buttonStyle = {{marginTop:30}}
        onPress={() => this.props.navigation.dispatch({ type: 'Login' })}
        />
    );
  }


  render() {
    const navigation = this.props.navigation;
    return (
      <ScrollView>
      <View style={styles.formStyle}>
        <FormLabel labelStyle = {{fontSize:15}}>帳號信箱</FormLabel>
        <FormInput
          placeholder='user@email.com'
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          /*onChangeText={email => this.setState({ email })}*/
        />
        <FormLabel labelStyle = {{fontSize:15}}>密碼</FormLabel>
          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='password'
            value={this.state.password}
            /*onChangeText={password => this.setState({ password })}*/
          />

        {this.renderButton(navigation)}

          <Text
           style={styles.textCancel}
           onPress={ () => this.props.navigation.navigate('Login') }>
                取消
          </Text>

      </View>
      </ScrollView>
    );
  }
}


export default NewUserScreen;