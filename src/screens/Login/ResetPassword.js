import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import data from '@src/data';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';

import { AuthError, SignIn } from '@src/Util/Auth';
import ErrorDisplay from '@src/components/Forms/ErrorDisplay';
import { ButtonLogin, ButtonLoginText } from '@src/components/Forms/Buttons';
import { FieldLogin } from '@src/components/Forms/Login';

import * as HOC from '@src/HOC';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);

const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);

import {
  BACKGROUND_DARK,
  BUTTON_COLOR,
  FONT_HEADLINE_SEMIBOLD
} from '@src/styles/common';


class ScreensResetPassword extends Component {

    constructor(props) {
      super(props);
      this.state = {
        delivery: null,
        logging: false,
      };
    }

    state: {
      username: '',
      password: '',
      user: ''
    }

    onChangeText = (key, value) => {
      this.setState({
        [key]: value.replace(/\s/g, '')
      });
    }

    cancelResetHandler = () => {
      this.props.navigation.navigate('LoginHandler');
    }

    requestResetHandler = () => {
      const { username } = this.state;
      if (!username) {
          this.setState({ error: 'Username cannot be empty' });
          return;
      }
      this.setState({ logging: true })
      Auth.forgotPassword(username)
           .then(data => {
               this.setState({
                 error: '',
                 delivery: data.CodeDeliveryDetails,
                 logging: false,
               });
           })
           .catch(err => {
             AuthError(err)
             this.setState({ error: msg, logging: false });
           });
    }

    submitResetHandler = () => {
        const { username, authCode, password } = this.state;
        this.setState({ logging: true })
        Auth.forgotPasswordSubmit(username, authCode, password)
            .then(data => {
                console.log('Reset Successful')
                this.props.navigation.navigate('LoginHandler');
            })
            .catch(err => {
              AuthError(err)
              this.setState({ error: msg, logging: false });
            });
    }

    renderLoginField = (placeholder, name, type, secure) => {
        return (
            <TextInput
              placeholder={`${placeholder}`}
              placeholderTextColor="rgba(255,255,255,0.7)"
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.input}
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'next'}
              keyboardType={type}
              secureTextEntry={secure}
              onChangeText={value => this.onChangeText(name, value)}
            />
        )
    }

    renderAuthField = (placeholder, name, secure) => {
        return (
            <TextInput
              placeholder={`${placeholder}`}
              placeholderTextColor="rgba(255,255,255,0.7)"
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.inputAuth}
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              maxLength={6}
              secureTextEntry={secure}
              onChangeText={value => this.onChangeText(name, value)}
            />
        )
    }

    render() {

      const { hasSuccessLogin } = this.state

      return (

        <FullSCreenSpinnerAndDismissKeyboardView
          spinner={this.state.logging}
          style={styles.screenCover}
          >

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

                    { !this.state.delivery &&
                      <View>

                        <View style={styles.bodyMessage}>
                          <Text style={styles.bodyText}>Reset your password</Text>
                        </View>

                        { this.renderLoginField("Email Address", 'username', 'email-address', false) }

                        <View style={styles.lineStyle} />

                      </View>
                    }

                    { this.state.delivery &&
                      <View>
                        <View style={styles.bodyMessage}>
                          <Text style={styles.bodyText}>Reset Code sent via SMS</Text>
                        </View>

                        { this.renderAuthField("Enter Reset Code", 'authCode', false) }

                        <View style={styles.lineStyle} />

                        { this.renderLoginField("New Password", 'password', 'default', true) }

                      </View>
                    }

                  </View>
              </KeyboardAvoidingView>

              <View style={styles.footer}>

                <ErrorDisplay
                  error={this.state.error}
                  formType="Login"
                />

                { !this.state.delivery &&
                  <View style={styles.footerBlock}>
                    <ButtonLogin
                      buttonLabel="get reset code"
                      onPressHandler={this.requestResetHandler}
                    />
                    <ButtonLoginText
                      buttonLabel="Cancel Reset"
                      textType="light"
                      onPressHandler={this.cancelResetHandler}
                    />
                  </View>
                }
                { this.state.delivery &&
                  <View style={styles.footerBlock}>
                    <ButtonLogin
                      buttonLabel="submit"
                      onPressHandler={this.submitResetHandler}
                    />
                    <ButtonLoginText
                      buttonLabel="Didn't get it? Resend Code"
                      textType="light"
                      onPressHandler={this.resendAuthHandler}
                    />
                  </View>
                }

                <Text style={styles.copyright}>
                  {'\u00A9'} 2018 lifeinsure.io / Build: 15-Jul.v3
                </Text>

              </View>
        </View>

        </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}

const styles = StyleSheet.create({
  screenCover: {
    flex: 1,
  },
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
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
  },
  inputAuth: {
    height: 45,
    width: 250,
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
  },
  lineStyle: {
    width: 250,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
    marginVertical: 10,
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
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
  },
  bodyLight: {
    justifyContent: 'center',
    fontFamily: 'OpenSansRegular',
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  footerBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  copyright: {
    marginTop: 20,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  }
});



export default ScreensResetPassword;
