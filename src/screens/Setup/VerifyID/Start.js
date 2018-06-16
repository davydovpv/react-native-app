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
import SetupHeader from '@src/components/Setup/Header';
import { Auth } from 'aws-amplify';
import data from '@src/data';

class ScreensVerifyIDStart extends Component {

    onChangeText(key, value) {
      this.setState({
        [key]: value
      });
    }

    registerHandler = () => {

      this.props.navigation.navigate('VerifyID')

    }


    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          <SetupHeader/>

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Confirm Your Idenfity</Text>
          </View>


          <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
            <ScrollView style={styles.scrollView}>

              <View style={styles.inputRow}>
                <Text>Please make sure this information matches your Government Issued ID. For security, all details are verified using Equifax Identity Database.</Text>
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.fullNameInput = input }
                  onSubmitEditing={() => this.addressInput.focus()}
                  onChangeText={value => this.onChangeText('name', value)}
                  style={styles.input}
                  value={ data.name }
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
                  onSubmitEditing={() => this.cityInput.focus()}
                  onChangeText={value => this.onChangeText('address', value)}
                  style={styles.input}
                  />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>City</Text>
                <TextInput
                  placeholder="New York"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.cityInput = input }
                  onSubmitEditing={() => this.stateInput.focus()}
                  onChangeText={value => this.onChangeText('city', value)}
                  style={styles.input}
                  />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>State</Text>
                <TextInput
                  placeholder="NY"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCorrect={false}
                  returnKeyType="next"
                  ref={(input) => this.stateInput = input }
                  onSubmitEditing={() => this.countryInput.focus()}
                  onChangeText={value => this.onChangeText('state', value)}
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
                  onSubmitEditing={() => this.sexInput.focus()}
                  onChangeText={value => this.onChangeText('country', value)}
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
                  onChangeText={value => this.onChangeText('sex', value)}
                  style={styles.input}
                  />
              </View>

            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ this.registerHandler }
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

export default ScreensVerifyIDStart;