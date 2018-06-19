import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import { BUTTON_COLOR } from '@src/styles/common';
import RegisterHeader from '@src/components/Register/Header';
import data from '@src/data';

class ScreensRegisterSuccess extends Component {

    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RegisterHeader />

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Welcome to LFI!</Text>
            <Image
              source={require('@assets/images/icon-checkshield.png')}
              style={styles.iconShield}
              resizeMode='contain'
            />

          </View>

          <ScrollView>
          <View style={styles.body}>

            <Text style={styles.bodyText}>
              Dear {data.name}, {'\n'}
              {'\n'}
              Thank you for registering an account with Life Insure. After you login, you'll be able to register an LFI Wallet and get started.{'\n'}
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
              onPress={ () => {
                navigation.navigate('LoginHandler')
              } }
            >
              <Text style={styles.boldButton}>Proceed to Login</Text>
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

export default ScreensRegisterSuccess;
