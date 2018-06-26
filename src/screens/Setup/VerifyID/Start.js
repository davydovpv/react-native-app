import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage,
} from 'react-native';

import SetupHeader from '@src/components/Setup/Header';
import { ButtonLogin } from '@src/components/Forms/Buttons';

// Amplify + JSON Data
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUser } from '@src/queries/GetUser'
import { UpdateUserRegister } from '@src/mutations/UpdateUser'
import data from '@src/data';

import ErrorDisplay from '@src/components/Forms/ErrorDisplay';

class ScreensVerifyIDStart extends Component {

    state = {
      isLoading: true,
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      sex: ''
    }

    onChangeText(key, value) {
      this.setState({
        [key]: value
      });
    }

    async componentWillMount() {

      const userInfo = await API.graphql(graphqlOperation(GetUser, { userId: data.id }))

      const {
        name,
        address,
        city,
        state,
        country,
        sex
      } = userInfo.data.getUser;

      this.setState({
        name: name,
        address: address,
        city: city,
        state: state,
        country: country,
        sex: sex,
        isLoading: false
      })

      data.name = this.state.name

    }

    registerHandler = () => {

      // Bring in rest of user information
      const { name, address, city, state, country, sex } = this.state

      // Update DB
      const userDetails = {
        "userId": data.id,
        "name": name,
        "address": address,
        "city": city,
        "state": state,
        "country": country,
        "sex": sex
      }

      // Validations
      if (userDetails.address == null) {
        this.setState({
          error: 'Please enter Address',
        });
        console.log("address missing")
        return
      }

      if (userDetails.city == null) {
        this.setState({
          error: 'Please enter City',
        });
        console.log("city missing")
        return
      }

      if (userDetails.state == null) {
        this.setState({
          error: 'Please enter State',
        });
        console.log("state missing")
        return
      }

      if (userDetails.sex == null) {
        this.setState({
          error: 'Please enter Sex',
        });
        console.log("sex missing")
        return
      }

      // Proceed to Mutuate DB
      this.updateExistingUser(userDetails)

    }

    updateExistingUser = async (userDetails) => {

      const updateUser = await API.graphql(graphqlOperation(UpdateUserRegister, userDetails));
      console.log('db update success: ', updateUser)

      // Temporary - remove this later
      data.name = userDetails.name

      // Clear Error Message
      this.setState({
        error: ''
      })

      this.props.navigation.navigate('Process')


    }

    render() {

      const { name, address, city, state, country, sex } = this.state;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          <SetupHeader/>

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Confirm Your Idenfity</Text>
          </View>


          <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
            <ScrollView style={styles.scrollView}>

              <View style={[styles.inputRow, {marginBottom: 10}]}>
                <Text>Please make sure this information matches your Government Issued ID.</Text>
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
                  value={ name }
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
                  value={ address }
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
                  value={ city }
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
                  value={ state }
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
                  value={ country }
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
                  value={ sex }
                  />
              </View>

            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.footer}>

            <ErrorDisplay
              error={this.state.error}
              formType="Register"
            />

            <ButtonLogin
              buttonLabel="Continue to Verify ID"
              onPressHandler={ this.registerHandler }
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
});

export default ScreensVerifyIDStart;
