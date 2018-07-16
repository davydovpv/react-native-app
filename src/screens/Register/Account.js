import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import data from '@src/data';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { AuthError } from '@src/Util/AuthError';

import RegisterHeader from '@src/components/Register/HeaderStart';
import ErrorDisplay from '@src/components/Forms/ErrorDisplay';
import { ButtonLogin } from '@src/components/Forms/Buttons';

import * as HOC from '@src/HOC';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);

class ScreensRegisterAccount extends Component {

    constructor() {
      super();
      this.state = {
        verifyNewAccount: false
      };
    }

    state: {
      username: '',
      email: '',
      password: '',
      phone_number: '',
      userSub: '',
      error: ''
    }

    onChangeText(key, value) {
      this.setState({
        [key]: value.replace(/\s/g, '')
      });
    }

    signUp() {
      const { email, password, phone_number } = this.state

      Auth.signUp({
        username: email,
        email: email,
        password: password,
        attributes: {
          phone_number: phone_number,
        }
      })
      .then(res => {
        this.setState({
          verifyNewAccount: true,
          userSub: res.userSub,
          error: ''
        })

        // Temporary
        data.id = res.userSub
        data.username = email
        data.email = email
        data.phone = phone_number

        console.log('Account Created! ', res)

        this.props.navigation.navigate('VerifyAccount')
      })
      .catch(err => {
        AuthError(err)
        this.setState({ error: msg });
        console.log('Error Creating Account: ', err)
      })
    }


    clearErrorMessage = () => {
      this.setState({
        error: ''
      });
    }

    render() {

      registerHandler = () => {
        this.signUp()
      }

      return (

        <View style={styles.container}>

          <StatusBar barStyle="light-content" />

          <RegisterHeader />

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Create New Account</Text>
          </View>

          <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
          <DismissKeyboardView>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    placeholder="james.smith@gmail.com"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="email-address"
                    ref={(input) => this.emailInput = input }
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={value => this.onChangeText('email', value)}
                    style={styles.input}
                    />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    underlineColorAndroid="rgba(0,0,0,0)"
                    secureTextEntry
                    autoCorrect={false}
                    returnKeyType="next"
                    ref={(input) => this.passwordInput = input }
                    onSubmitEditing={() => this.phoneInput.focus()}
                    onChangeText={value => this.onChangeText('password', value)}
                    style={styles.input}
                    />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Phone</Text>

                  <View style={styles.inputImageGroup}>

                    <View style={styles.inputImage}>
                      <Image
                        source={require('@assets/images/icon-usd.png')}
                        style={{width:30, height: 20}}
                        resizeMode="contain"
                      />
                      <Text>+ 1</Text>
                    </View>

                    <TextInput
                      underlineColorAndroid="rgba(0,0,0,0)"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      ref={(input) => this.phoneInput = input }
                      onChangeText={value => this.onChangeText('phone_number', '+1' + value)}
                      style={styles.inputWithImage}
                      />
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <Text> {"\n"}
                    We will send you an SMS to confirm your phone number. Message and data rates may apply.
                  </Text>
                </View>

          </DismissKeyboardView>
          </KeyboardAvoidingView>

          <View style={styles.footer}>

            <ErrorDisplay
              error={this.state.error}
              formType="Register"
            />
            <ButtonLogin
              buttonLabel="Sign Up"
              onPressHandler={ registerHandler }
            />

          </View>


        </View>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headingRow: {
    width: '100%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headingText:{
    fontSize: 20,
    fontFamily: 'MontserratSemiBold'
  },
  smallHeadingText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputLabel: {
    width: 115,
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 18,
  },
  inputImageGroup: {
    flex: 1,
    flexDirection: 'row',
    height: 42,
  },
  inputImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 60,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRightWidth: 0,
  },
  inputWithImage: {
    flex: 1,
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 18,
  },
  inputFull: {
    flex: 1,
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 18,
  },
  inputAuth: {
    width: 250,
    height: 42,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  resendCode: {
    fontSize: 16,
    color: '#666',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#F2F2F2',
  }
});

export default ScreensRegisterAccount;
