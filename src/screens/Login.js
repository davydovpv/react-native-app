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
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUserIDVerified } from '@src/queries/GetUser';
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


class ScreensLogin extends Component {

    constructor(props) {
      super(props);
      this.state = {
        has2StepAuth: true,
        idVerified: false,
        hasSuccessLogin: false,
        logging: false,
      };
    }

    state: {
      username: '',
      password: '',
      authCode: '',
      user: ''
    }

    async componentWillMount() {

      let userObj = {
        name: "",
        age: "",
        sex: "",
        city: "",
        state: "",
        country: "",
        lfi_balance: ""
      }
      AsyncStorage.setItem('user', JSON.stringify(userObj))
    }

    onChangeText(key, value) {
      this.setState({
        [key]: value.replace(/\s/g, '')
      });
    }

    loginHandler = async () => {
      this.setState({
        error: '',
        logging: true
      })

      const { username, password } = this.state
      const { navigation } = this.props

      // // Start Dev Mode (Skip login, set user as David S.)
      // let signInID = 'b7251d14-1ae5-40d0-9fb3-0664865b1997'
      // data.id = signInID
      // this.verifiedLoginHandler(signInID)
      // return
      // // End Dev Mode

      Auth.signIn(username, password)
        .then(user => {
          console.log('logged in!', user)
          this.setState({
            error: '',
            hasSuccessLogin: true,
            user: user,
            logging: false
          })
        })
        .catch(err => {
          AuthError(err)
          this.setState({ error: msg, logging: false });
        })
    }

    verifyHandler = () => {
      this.setState({ logging: true })
      const { user, authCode } = this.state

      Auth.confirmSignIn(user, authCode)
        .then(user => {
          //To Do: Fix this later by persisting via Auth Token
          let signInID = user.signInUserSession.accessToken.payload.sub
          data.id = signInID
          this.verifiedLoginHandler(signInID)
        })
        .catch(err => {
          AuthError(err)
          this.setState({ error: msg, logging: false });
        })
    }

    updateError = (err) => {
      return
    }

    registerHandler = () => {
      this.props.navigation.navigate('Register');
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

    clearErrorMessage = () => {
      this.setState({ error: '' });
    }

    verifiedLoginHandler = async (id) => {

      const userInfo = await API.graphql(graphqlOperation(GetUserIDVerified, { userId: id }))
      const { has_verified_id } = userInfo.data.getUser;

      this.setState({ logging: false })

      if (has_verified_id === true) {
        this.props.navigation.navigate('Home')
      } else {
        this.props.navigation.navigate('Welcome')
      }
    }

    welcomeTourHandler = () => {
      this.props.navigation.navigate('Onboard');
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

                    { !this.state.hasSuccessLogin &&
                      <View>

                        { this.renderLoginField("Username / Email", 'username', 'email-address', false) }

                        <View style={styles.lineStyle} />

                        { this.renderLoginField("Password", 'password', 'default', true) }
                      </View>
                    }

                    { this.state.hasSuccessLogin &&
                      <View>
                        <View style={styles.bodyMessage}>
                          <Text style={styles.bodyText}>6-Digit Code sent via SMS</Text>
                        </View>

                        { this.renderAuthField("Verification Code", 'authCode', true) }

                        <View style={styles.lineStyle} />
                      </View>
                    }

                  </View>
              </KeyboardAvoidingView>

              <View style={styles.footer}>

                <ErrorDisplay
                  error={this.state.error}
                  formType="Login"
                />

                { this.state.hasSuccessLogin &&
                  <View style={styles.footerBlock}>
                    <ButtonLogin
                      buttonLabel="verify code"
                      onPressHandler={this.verifyHandler}
                    />
                    <ButtonLoginText
                      buttonLabel="Didn't get it? Resend Code"
                      textType="light"
                      onPressHandler={this.resendAuthHandler}
                    />
                  </View>
                }
                { !this.state.hasSuccessLogin &&
                  <View style={styles.footerBlock}>
                    <ButtonLogin
                      buttonLabel="login"
                      onPressHandler={this.loginHandler}
                    />
                    <ButtonLoginText
                      buttonLabel="create account"
                      textType="bold"
                      onPressHandler={this.registerHandler}
                    />
                  </View>
                }
                <Text style={styles.copyright}>
                  {'\u00A9'} 2018 lifeinsure.io / Build: 15-Jul.v2
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
    fontSize: 22,
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



export default ScreensLogin;
