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
import { CreateUser } from '@src/mutations/CreateUser';
import { AuthError } from '@src/Util/AuthError';

import RegisterHeader from '@src/components/Register/Header';
import ErrorDisplay from '@src/components/Forms/ErrorDisplay';
import { ButtonLogin } from '@src/components/Forms/Buttons';


class ScreensRegisterAccount extends Component {

    constructor() {
      super();
      this.state = {
        verifyNewAccount: false
      };
    }

    state: {
      given_name: '',
      family_name: '',
      username: '',
      password: '',
      email: '',
      phone_number: '',
      authCode: '',
      userSub: '',
      error: ''
    }

    onChangeText(key, value) {
      this.setState({
        [key]: value
      });
    }

    signUp() {
      const { given_name, family_name, username, password, email, phone_number } = this.state

      Auth.signUp({
        username: username,
        password: password,
        attributes: {
          given_name: given_name,
          family_name: family_name,
          email: email,
          phone_number: phone_number,
        }
      })
      .then(res => {
        this.setState({
          verifyNewAccount: true,
          userSub: res.userSub,
          error: ''
        })
        console.log('Account Created! ', res)
      })
      .catch(err => {
        AuthError(err)
        this.setState({ error: msg });
        console.log('Error Creating Account: ', err)
      })
    }


     verify() {
      const { username, authCode, given_name, family_name, email, phone_number, userSub } = this.state
      Auth.confirmSignUp(username, authCode)
        .then(res => {
          console.log('Confirmed', res)

          let fullname = `${given_name} ${family_name}`

          // Temporary Remove once Auth Token implemented
          data.name = fullname
          data.username = username

          // Store in DB
          const userDetails = {
            "userId": userSub,
            "cognitoId": username,
            "name": fullname,
            "email": email,
            "phone": phone_number,
            "country": "USA"
          }
          this.createNewUser(userDetails)

        })
        .catch(err => {
          AuthError(err)
          this.setState({ error: msg });
          console.log('Error Verifying: ', err)
        })
    }

    createNewUser = async (userDetails) => {
      const newUser = await API.graphql(graphqlOperation(CreateUser, userDetails));
      console.log('db success: ', newUser)

      //Temporary for Remove once Auth Token implemented
      data.id = userDetails.userId;

      this.props.navigation.navigate('Success')
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
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    placeholder="John"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    ref={(input) => this.givenNameInput = input }
                    onSubmitEditing={() => this.familyNameInput.focus()}
                    onChangeText={value => this.onChangeText('given_name', value)}
                    style={styles.input}
                    />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    placeholder="Smith"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    ref={(input) => this.familyNameInput = input }
                    onSubmitEditing={() => this.userNameInput.focus()}
                    onChangeText={value => this.onChangeText('family_name', value)}
                    style={styles.input}
                    />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>User Name</Text>
                  <TextInput
                    placeholder="Ex: jsmith72"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    ref={(input) => this.userNameInput = input }
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
                      placeholder="Enter Verification Code"
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
                       We have sent a verification code to {this.state.phone_number}.
                       Note: SMS may take a few seconds to arrive.
                    </Text>
                  </View>
                </View>
              }
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.footer}>

            <ErrorDisplay
              error={this.state.error}
              formType="Register"
            />

            { !this.state.verifyNewAccount &&

              <ButtonLogin
                buttonLabel="Sign Up"
                onPressHandler={ registerHandler }
              />
            
            }

            { this.state.verifyNewAccount &&

              <ButtonLogin
                buttonLabel="Verify Phone Number"
                onPressHandler={ verifyHandler }
              />

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
    fontSize: 15,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  inputImageGroup: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
  },
  inputImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 60,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRightWidth: 0,
  },
  inputWithImage: {
    flex: 1,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
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
