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
import { CreateUserNew } from '@src/mutations/CreateUserNew';
import { AuthError } from '@src/Util/AuthError';

import RegisterHeader from '@src/components/Register/Header';
import ErrorDisplay from '@src/components/Forms/ErrorDisplay';
import { ButtonLogin } from '@src/components/Forms/Buttons';

import * as HOC from '@src/HOC';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);

class ScreensRegisterVerify extends Component {

    constructor() {
      super();
      this.state = {
        verifyNewAccount: false
      };
    }

    state: {
      authCode: '',
      error: ''
    }

    onChangeText(key, value) {
      this.setState({
        [key]: value.replace(/\s/g, '')
      });
    }

    verify() {
      const { authCode } = this.state

      Auth.confirmSignUp(data.username, authCode)
        .then(res => {
          console.log('Confirmed', res)

          // Store in DB
          const userDetails = {
            "userId": data.id,
            "cognitoId": data.username,
            "email": data.email,
            "phone": data.phone,
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
      const newUser = await API.graphql(graphqlOperation(CreateUserNew, userDetails));
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
          <DismissKeyboardView>

                <View>
                  <View style={styles.inputRow}>
                    <Text style={styles.smallHeadingText}>
                      Verify Phone Number
                    </Text>
                  </View>

                  <View style={styles.inputRow}>
                    <Text style={{fontSize: 16}}>
                      We have sent a verification code to {data.phone}.
                    </Text>
                  </View>

                  <View style={styles.inputRow}>
                    <TextInput
                      placeholder="Enter Verification Code"
                      underlineColorAndroid="rgba(0,0,0,0)"
                      autoCorrect={false}
                      returnKeyType={'go'}
                      keyboardType={'numeric'}
                      maxLength={6}
                      onChangeText={value => this.onChangeText('authCode', value)}
                      style={styles.inputAuth}
                      />
                  </View>

                  <View style={styles.inputRow}>
                    <TouchableOpacity>
                      <Text style={styles.resendCode}>
                        Resend Code
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

          </DismissKeyboardView>
          </KeyboardAvoidingView>

          <View style={styles.footer}>

            <ErrorDisplay
              error={this.state.error}
              formType="Register"
            />
            <ButtonLogin
              buttonLabel="Verify Phone Number"
              onPressHandler={ verifyHandler }
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
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 18,
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
    fontSize: 18,
  },
  inputFull: {
    flex: 1,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 18,
  },
  inputAuth: {
    width: 250,
    height: 50,
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

export default ScreensRegisterVerify;
