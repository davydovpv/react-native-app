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

import { BUTTON_COLOR } from '@src/styles/common';
import RegisterHeader from '@src/components/Register/Header';

class ScreensRegisterConfirmID extends Component {

    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          <RegisterHeader/>

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Confirm Your Idenfity</Text>
          </View>


          <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
            <ScrollView style={styles.scrollView}>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.firstNameInput = input }
                  onSubmitEditing={() => this.lastNameInput.focus()}
                  style={styles.input}
                  />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.lastNameInput = input }
                  onSubmitEditing={() => this.addressInput.focus()}
                  style={styles.input}
                  />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  placeholder="Your primary residence"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.addressInput = input }
                  onSubmitEditing={() => this.countryInput.focus()}
                  style={styles.input}
                  />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Country</Text>
                <TextInput
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.countryInput = input }
                  onSubmitEditing={() => this.zipCodeInput.focus()}
                  style={styles.input}
                  />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Zip Code</Text>
                <TextInput
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.zipCodeInput = input }
                  onSubmitEditing={() => this.sexInput.focus()}
                  style={styles.input}
                  />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Sex</Text>
                <TextInput
                  placeholder="M or F"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="go"
                  ref={(input) => this.sexInput = input }
                  style={styles.input}
                  />
              </View>

            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ () => { navigation.navigate('VerifyID')} }
            >
              <Text style={styles.boldButton}>Continue to Verify ID</Text>
            </TouchableOpacity>
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

export default ScreensRegisterConfirmID;
