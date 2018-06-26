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
  Button,
  AsyncStorage
} from 'react-native';

import data from '@src/data';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUserIDVerified } from '@src/queries/GetUser';
import { AuthError, SignIn } from '@src/Util/Auth';
import ErrorDisplay from '@src/components/Forms/ErrorDisplay';
import { ButtonLogin, ButtonLoginText } from '@src/components/Forms/Buttons';
import { FieldLogin } from '@src/components/Forms/Login';

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
        hasSuccessLogin: false
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
        [key]: value
      });
    }

    loginHandler = async () => {
      const { username, password } = this.state
      const { navigation } = this.props

      // Start Dev Mode (Skip login, set user as David S)
      // let signInID = 'cf06c2c8-673d-44bc-8c96-6e50aaf24dee'
      // data.id = signInID
      // this.verifiedLoginHandler(signInID)
      // return
      // End Dev Mode

      Auth.signIn(username, password)
        .then(user => {
          console.log('logged in!', user)
          this.setState({
            error: '',
            hasSuccessLogin: true,
            user: user
          })
        })
        .catch(err => {
          AuthError(err)
          this.setState({ error: msg });
        })
    }

    verifyHandler = () => {
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
          this.setState({ error: msg });
        })
    }

    updateError = (err) => {
      return
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

    clearErrorMessage = () => {
      this.setState({ error: '' });
    }

    verifiedLoginHandler = async (id) => {

      const userInfo = await API.graphql(graphqlOperation(GetUserIDVerified, { userId: id }))
      const { has_verified_id } = userInfo.data.getUser;

      if (has_verified_id === true) {
        this.props.navigation.navigate('Home')
      } else {
        this.props.navigation.navigate('Welcome')
      }
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
                          <Text style={styles.bodyText}>Verification Code sent via SMS</Text>
                        </View>

                        { this.renderLoginField("Enter Verification Code", 'authCode', true) }

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
