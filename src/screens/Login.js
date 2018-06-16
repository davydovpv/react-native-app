import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Button
} from 'react-native';

import { Auth } from 'aws-amplify';

import {
  BACKGROUND_DARK,
  BUTTON_COLOR,
  FONT_HEADLINE_SEMIBOLD
} from '@src/styles/common';

class ScreensLogin extends Component {

    constructor() {
      super();
      this.state = {
        has2StepAuth: false,
        hasSuccessLogin: false,
        idVerified: false
      };
    }

    state: {
      username: '',
      password: '',
      authCode: '',
      user: ''
    }

    onChangeText(key, value) {
      this.setState({
        [key]: value
      });
    }

    loginHandler = () => {
      const { username, password } = this.state

      Auth.signIn(username, password)
      .then(user => {
        console.log('logged in!', user)
        this.setState({
          hasSuccessLogin: true,
          user: user
        })
        { !this.state.has2StepAuth &&
            this.props.navigation.navigate('Welcome')
        }
      })
      .catch(err => {
        console.log('error sign in: ', err)
      })
    }

    verifyHandler = () => {
      const { user, authCode } = this.state

      Auth.confirmSignIn(user, authCode)
        .then(user => {
          console.log('verified user:', user)
          this.props.screenProps.authenticate(true)
        })
        .catch(err => {
          console.log('error confirming sign in: ', err)
        })
    }

    registerHandler = () => {
      this.props.navigation.navigate('Register');
    }

    renderLoginField = (placeholder, name, secure) => {
        return (
          <TextInput
            placeholder={`${placeholder}`}
            placeholderTextColor="rgba(255,255,255,0.7)"
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={secure}
            onChangeText={value => this.onChangeText(name, value)}
          />
        )
    }

    render() {

      const { hasSuccessLogin } = this.state

      return (
        <View style={styles.loginContainer}>

            <StatusBar barStyle="light-content" />


              <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>

                  <View style={styles.loginLogo}>
                    <Image
                      source={require('@assets/images/logo.png')}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('@assets/images/slogan.png')}
                      style={styles.slogan}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.loginForm}>

                    { !this.state.hasSuccessLogin &&
                      <View>

                        { this.renderLoginField("Username", 'username', false) }

                        <View style={styles.lineStyle} />

                        { this.renderLoginField("Password", 'password', true) }

                      </View>
                    }

                    { this.state.hasSuccessLogin &&
                      <View>

                        <View style={styles.bodyMessage}>
                          <Text style={styles.bodyText}>Verification Key sent via SMS</Text>
                        </View>

                          { this.renderLoginField("Enter Verification Key", 'authCode', true) }

                        <View style={styles.lineStyle} />

                      </View>
                    }

                  </View>

              </KeyboardAvoidingView>

              <View style={styles.footer}>

                { this.state.hasSuccessLogin &&
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={ this.verifyHandler }>
                    <Text style={styles.boldButton}>verify key</Text>
                  </TouchableOpacity>
                }

                { !this.state.hasSuccessLogin &&
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={ this.loginHandler }>
                    <Text style={styles.boldButton}>login</Text>
                  </TouchableOpacity>
                }

                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={ this.registerHandler }>
                  <Text style={styles.boldButton}>create account</Text>
                </TouchableOpacity>

                <Text style={styles.copyright}>
                  {'\u00A9'} 2018 lifeinsure.io
                </Text>

              </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BACKGROUND_DARK,
    padding: 20,
  },
  loginLogo: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 225,
    height: 50,
  },
  slogan: {
    width: 225,
    height: 40,
  },
  loginForm: {
    flex: 0.85,
    justifyContent: 'flex-end',
  },
  input: {
    height: 40,
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
  },
  lineStyle: {
    width: 250,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
    margin: 10,
  },
  body: {
    flex: 4,
  },
  bodyMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40
  },
  bodyText: {
    justifyContent: 'center',
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: 'rgba(255,255,255,1)',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  boldButton: {
    fontFamily: FONT_HEADLINE_SEMIBOLD,
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
  },
  buttonLogin: {
    backgroundColor: BUTTON_COLOR,
    borderRadius: 15,
    paddingVertical: 20,
    height: 65,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {
    marginTop: 5,
    paddingVertical: 20,
  },
  copyright: {
    marginTop: 20,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  }
});



export default ScreensLogin;
