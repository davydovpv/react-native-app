import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import { BUTTON_COLOR } from '@src/styles/common';
import SetupHeader from '@src/components/Setup/Header';

import data from '@src/data';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { UpdateUserVerifiedID } from '@src/mutations/UpdateUser'

class ScreensVerifyIDSuccess extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        name: data.name
      };
    }

    successVerifyIDHandler = () => {

      const userDetails = {
        "userId": data.id,
        "has_verified_id": true
      }
      this.updateExistingUser(userDetails)

    }

    updateExistingUser = async (userDetails) => {
      const updateUser = await API.graphql(graphqlOperation(UpdateUserVerifiedID, userDetails));
      console.log('db update success: ', updateUser)

      this.props.navigation.navigate('Welcome')
    }

    render() {

      const { name } = this.state;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <SetupHeader />

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Identify Verified</Text>
            <Image
              source={require('@assets/images/icon-checkshield.png')}
              style={styles.iconShield}
              resizeMode='contain'
            />

          </View>

          <ScrollView>
          <View style={styles.body}>

            <Text style={styles.bodyText}>
              Dear {name}, {'\n'}
              {'\n'}
              Your identify was verified with NETVERIFY by Jumio. You now have full access to the Life Insure App and LFI Wallet.{'\n'}
              {'\n'}
              Welcome to LFI!{'\n'}
              {'\n'}
              Best,{'\n'}
            </Text>

            <Image
              source={require('@assets/images/signature.png')}
              style={{height:80, width: 120}}
              resizeMode="contain"
            />

            <Text style={styles.bodyText}>
              David Moyal{'\n'}
              Founder, LFI
            </Text>

          </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ this.successVerifyIDHandler }
            >
              <Text style={styles.boldButton}>Proceed to Account</Text>
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
    backgroundColor: '#fff'
  },
  headingRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 30,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headingText: {
    fontSize: 20,
    fontFamily: 'MontserratSemiBold'
  },
  iconShield: {
    height: 30,
    width: 30,
    tintColor: 'green',
    marginLeft: 10
  },
  body: {
    flex: 1,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bodyText: {
    fontSize: 15,
    fontFamily: 'OpenSansRegular',
  },
  footer: {
    width: '100%',
    padding: 20,
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

export default ScreensVerifyIDSuccess;
