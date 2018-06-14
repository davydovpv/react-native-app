import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import { BUTTON_COLOR } from '../../styles/common';
import RegisterHeader from '../../components/Register/Header';

class ScreensRegisterSetup extends Component {

    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RegisterHeader />

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Welcome to LFI</Text>
          </View>

          <View style={styles.body}>

            <Text style={styles.bodyText}>
              To finish setting up your Life Insure Wallet, please add LFI Tokens.
            </Text>

            <Text style={styles.subHeadingText}>I would like to buy LFI Tokens with:</Text>

            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>

              <TouchableOpacity
                style={styles.fundMethod}
                onPress={ () => { navigation.navigate('FundCrypto')} }
              >

                <View style={{flexDirection: 'row', margin: 5}}>
                  <Image
                    source={require('../../../assets/images/icon-btc.png')}
                    style={{height:30,width: 30, marginHorizontal: 5}}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('../../../assets/images/icon-eth.png')}
                    style={{height:32,width: 32, marginHorizontal: 5}}
                    resizeMode="contain"
                  />
                </View>

                <Text>Bitcoin or ETH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.fundMethod}
                onPress={ () => { navigation.navigate('FundBank')} }
              >
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5}}>

                  <Image
                    source={require('../../../assets/images/logo-chase.png')}
                    style={{height:25,width: 25, borderRadius: 5, margin: 3}}
                    resizeMode="contain"
                  />

                  <Image
                    source={require('../../../assets/images/logo-bofa.png')}
                    style={{height:25,width: 25, borderRadius: 5, margin: 3}}
                    resizeMode="contain"
                  />

                  <Image
                    source={require('../../../assets/images/logo-citi.png')}
                    style={{height:25,width: 25, borderRadius: 5, margin: 3}}
                    resizeMode="contain"
                  />

                </View>
                <Text>Bank Account</Text>
              </TouchableOpacity>

            </View>

          </View>

          <View style={styles.footer}>
            <Text style={styles.subHeadingText}>Bought LFI in a crypto exchange?{'\n'}</Text>

            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ () => { navigation.navigate('ImportTokens')} }
            >
              <Text style={styles.boldButton}>Import Your Tokens</Text>
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
  fundMethod: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    height: 120,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  subHeadingText: {
    fontSize: 15,
    fontFamily: 'MontserratSemiBold'
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
    paddingVertical: 30,
    paddingHorizontal: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 15,
    fontFamily: 'OpenSansRegular',
  },
  footer: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  boldButton: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    color: 'rgba(255,255,255,1)',
  },
  buttonBuy: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 15,
    paddingVertical: 15,
    height: 50,
  },
});

export default ScreensRegisterSetup;
