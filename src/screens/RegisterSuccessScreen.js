import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import { BUTTON_COLOR } from '../styles/common';
import RegisterHeader from '../components/RegisterHeader';

class RegisterSuccessScreen extends Component {

    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RegisterHeader />

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Identify Verified</Text>
            <Image
              source={require("../../assets/images/icon-checkshield.png")}
              style={styles.iconShield}
              resizeMode='contain'
            />

          </View>

          <View style={styles.body}>
            <Text style={styles.bodyText}>
              Dear Adam Rosen, {'\n'}
              {'\n'}
              Your identify was verified with NETVERIFY by Jumio. You now have full access to the Life Insure App and LFI Wallet.{'\n'}
              {'\n'}
              Welcome to LFI!{'\n'}
              {'\n'}
              Best,{'\n'}
            </Text>

            <Image
              source={require("../../assets/images/signature.png")}
              style={{height:80, width: 120}}
              resizeMode="contain"
            />

            <Text style={styles.bodyText}>
              David Moyal{'\n'}
              Founder, LFI
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ () => { navigation.navigate("Home")} }
            >
              <Text style={styles.boldButton}>Proceed to LFI Wallet</Text>
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

export default RegisterSuccessScreen;
