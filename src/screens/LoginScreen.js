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
        require2StepAuth: true,
        hasSuccessLogin: false
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

    signIn() {
      const { username, password } = this.state
      Auth.signIn(username, password)
      .then(user => {
        console.log('logged in!', user)
        this.setState({
          hasSuccessLogin: true,
          user: user
        })
        !this.state.require2StepAuth &&
          this.props.navigation.navigate('Home')
      })
      .catch(err => {
        console.log('error sign in: ', err)
      })
    }

    verify() {
      const { user, authCode } = this.state
      Auth.confirmSignIn(user, authCode)
        .then(user => {
          console.log('verified user:', user)
          this.props.navigation.navigate('Home');
        })
        .catch(err => {
          console.log('error confirming sign in: ', err)
        })
    }

    async componentDidMount() {
      const {
        navigation: { navigate },
      } = this.props;
    }


    render() {

      const { navigation } = this.props;
      const { hasSuccessLogin } = this.state

      loginHandler = () => {
        this.signIn()
      }

      verifyHandler = () => {
        this.verify()
      }

      registerHandler = () => {
        navigation.navigate('Register');
      }

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
                        <TextInput
                          placeholder="Username"
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          underlineColorAndroid="rgba(0,0,0,0)"
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          keyboardType="email-address"
                          onSubmitEditing={() => this.passwordInput.focus()}
                          style={styles.input}
                          onChangeText={value => this.onChangeText('username', value)}
                          />

                        <View style={styles.lineStyle} />

                        <TextInput
                          placeholder="Password"
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          underlineColorAndroid="rgba(0,0,0,0)"
                          secureTextEntry
                          returnKeyType="next"
                          style={styles.input}
                          ref={(input) => this.passwordInput = input }
                          onChangeText={value => this.onChangeText('password', value)}
                          />

                      </View>
                    }

                    { this.state.hasSuccessLogin &&
                      <View>

                        <View style={styles.bodyMessage}>
                          <Text style={styles.bodyText}>Verification Key sent via SMS</Text>
                        </View>

                        <TextInput
                          placeholder="Enter Verification Key"
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          underlineColorAndroid="rgba(0,0,0,0)"
                          secureTextEntry
                          returnKeyType="go"
                          style={styles.input}
                          onChangeText={value => this.onChangeText('authCode', value)}
                          />

                        <View style={styles.lineStyle} />

                      </View>
                    }

                  </View>

              </KeyboardAvoidingView>

              <View style={styles.footer}>

                { this.state.hasSuccessLogin &&
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={verifyHandler}>
                    <Text style={styles.boldButton}>verify key</Text>
                  </TouchableOpacity>
                }

                { !this.state.hasSuccessLogin &&
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={loginHandler}>
                    <Text style={styles.boldButton}>login</Text>
                  </TouchableOpacity>
                }

                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={registerHandler}>
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
