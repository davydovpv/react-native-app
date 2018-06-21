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
import AmplifyMessageMap from '@src/Util/AmplifyMessageMap';
import { GetUserIDVerified } from '@src/queries/GetUser';

import {
  BACKGROUND_DARK,
  BUTTON_COLOR,
  FONT_HEADLINE_SEMIBOLD
} from '@src/styles/common';

class ScreensLogin extends Component {

    constructor() {
      super();
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

    loginHandler = () => {
      const { username, password } = this.state
      const { navigation } = this.props

      Auth.signIn(username, password)
      .then(user => {
        console.log('logged in!', user)

        this.setState({
          error: '',
          hasSuccessLogin: true,
          user: user
        })

        if (!this.state.has2StepAuth) {
          !this.state.idVerified && navigation.navigate('Welcome')
          this.state.idVerified && navigation.navigate('Home')
        }

      })
      .catch(err => {
        let msg = '';
        if (typeof err === 'string') {
            msg = err;
        } else if (err.message) {
            msg = err.message;
        } else {
            msg = JSON.stringify(err);
        }

        const map = this.props.errorMessage || AmplifyMessageMap;
        msg = (typeof map === 'string')? map : map(msg);

        this.setState({
          error: msg,
        });
      })
    }

    verifyHandler = () => {
      const { user, authCode } = this.state

      Auth.confirmSignIn(user, authCode)
        .then(user => {
          console.log('verified user:', user)

          //To Do: Fix this later by persisting via auth token
          let signInID = user.signInUserSession.accessToken.payload.sub
          data.id = signInID
          this.verifiedLoginHandler(signInID)
        })
        .catch(err => {
          let msg = '';
          if (typeof err === 'string') {
              msg = err;
          } else if (err.message) {
              msg = err.message;
          } else {
              msg = JSON.stringify(err);
          }

          const map = this.props.errorMessage || AmplifyMessageMap;
          msg = (typeof map === 'string')? map : map(msg);

          this.setState({
            error: msg,
          });
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

    clearErrorMessage = () => {
      this.setState({
        error: ''
      });
    }

    verifiedLoginHandler = async (id) => {
      const { navigation } = this.props;

      const userInfo = await API.graphql(graphqlOperation(GetUserIDVerified, { userId: id }))
      const { has_verified_id } = userInfo.data.getUser;

      console.log('has_verified_id: ', has_verified_id )

      has_verified_id === true ? navigation.navigate('Home') : navigation.navigate('Welcome')

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
                { this.state.error != null &&
                <View style={styles.footerBlock}>
                  <TouchableOpacity
                    onPress={this.clearErrorMessage}
                    >
                    <Text style={{ color: 'hotpink', fontSize: 15, paddingVertical: 15}}>
                      { this.state.error }
                    </Text>
                  </TouchableOpacity>
                </View>
                }

                { this.state.hasSuccessLogin &&
                  <View style={styles.footerBlock}>
                    <TouchableOpacity
                      style={styles.buttonLogin}
                      onPress={ this.verifyHandler }>
                      <Text style={styles.boldButton}>verify code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{paddingVertical: 25}}
                      onPress={this.resendAuthHandler}
                      >
                      <Text style={{ color: '#fff', fontSize: 16}}>
                        Didn't get it? Resend Code
                      </Text>
                    </TouchableOpacity>
                  </View>
                }

                { !this.state.hasSuccessLogin &&
                  <View style={styles.footerBlock}>
                    <TouchableOpacity
                      style={styles.buttonLogin}
                      onPress={ this.loginHandler }>
                      <Text style={styles.boldButton}>login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonRegister}
                      onPress={ this.registerHandler }>
                      <Text style={styles.boldButton}>create account</Text>
                    </TouchableOpacity>
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
