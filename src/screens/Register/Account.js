import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import { Auth } from 'aws-amplify';
import RegisterHeader from '@src/components/Register/Header';
import { BUTTON_COLOR } from '@src/styles/common';


class ScreensRegisterAccount extends Component {

    constructor() {
      super();
      this.state = {
        verifyNewAccount: false
      };
    }

    state: {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      authCode: ''
    }

    onChangeText(key, value) {
      this.setState({
        [key]: value
      });
    }

    signUp() {
      const { username, password, email, phone_number } = this.state
      Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
          phone_number: phone_number
        }
      })
      .then(res => {
        this.setState({
          verifyNewAccount: true
        })
        console.log('Account Created! ', res)
      })
      .catch(err => {
        console.log('Error Creating Account: ', err)
      })
    }


    verify() {
      const { username, authCode } = this.state
      Auth.confirmSignUp(username, authCode)
        .then(res => {
          console.log('Confirmed', res)
          this.props.navigation.navigate('ConfirmID')
        })
        .catch(err => {
          console.log('Error Verifying: ', err)
        })
    }

    render() {

      registerHandler = () => {
        this.signUp()

        /* To Do: Move to /Util/Auth
        SignUp (
          username,
          password,
          email,
          phone_number
        )
        */
      }

      verifyHandler = () => {
        this.verify()
      }

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          <RegisterHeader/>

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Create New Account</Text>
          </View>


          <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
            <ScrollView style={styles.scrollView}>

              { !this.state.verifyNewAccount &&
              <View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>User Name</Text>
                  <TextInput
                    placeholder="Ex: jsmith72"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    ref={(input) => this.firstNameInput = input }
                    onSubmitEditing={() => this.emailInput.focus()}
                    onChangeText={value => this.onChangeText('username', value)}
                    style={styles.input}
                    />
                </View>

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
                  <TextInput
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="phone-pad"
                    ref={(input) => this.phoneInput = input }
                    onChangeText={value => this.onChangeText('phone_number', value)}
                    style={styles.input}
                    />
                </View>

                <View style={styles.inputRow}>
                  <Text>
                    We will send you an SMS to confirm your phone number. Message and data rates may apply.
                  </Text>
                </View>
              </View>
              }

              { this.state.verifyNewAccount &&
                <View>
                  <View style={styles.inputRow}>
                    <Text style={styles.smallHeadingText}>
                      Verify Phone Number
                    </Text>
                  </View>
                  <View style={styles.inputRow}>
                    <TextInput
                      placeholder="Enter Verification Key"
                      underlineColorAndroid="rgba(0,0,0,0)"
                      secureTextEntry
                      autoCorrect={false}
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      onChangeText={value => this.onChangeText('authCode', value)}
                      style={styles.inputFull}
                      />
                  </View>
                  <View style={styles.inputRow}>
                    <Text>
                       We have sent a verification key to {this.state.phone_number}.
                       Note: SMS may take a few seconds to arrive.
                    </Text>
                  </View>
                </View>
              }
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.footer}>

            { !this.state.verifyNewAccount &&
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ registerHandler }
            >
              <Text style={styles.boldButton}>Sign Up</Text>
            </TouchableOpacity>
            }

            { this.state.verifyNewAccount &&
              <TouchableOpacity
                style={styles.buttonBuy}
                onPress={ verifyHandler }
              >
                <Text style={styles.boldButton}>Verify Phone Number</Text>
              </TouchableOpacity>
            }

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
    marginBottom: 5,
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
    fontSize: 15,
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
    flex: 0.35,
    fontFamily: 'MontserratSemiBold',
    fontSize: 15,
  },
  input: {
    flex: 0.6,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  inputFull: {
    flex: 1,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  footer: {
    width: '100%',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#F2F2F2',
  },
  boldButton: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
  },
  buttonBuy: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 15,
    paddingVertical: 20,
    height: 65,
  },
});

export default ScreensRegisterAccount;
