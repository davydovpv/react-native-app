import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import { BUTTON_COLOR } from '@src/styles/common';
import SetupHeader from '@src/components/Setup/Header';

class ScreensWalletSetup extends Component {

    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          <SetupHeader />

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Setup LFI Wallet</Text>
          </View>


          <ScrollView>

            <View style={styles.body}>

            <Text style={styles.bodyText}>
              To finish setting up your Life Insure Wallet, please add LFI Tokens. {"\n"}
            </Text>

            <View style={{marginVertical: 15}}>
              <Text style={styles.subHeadingText}>I would like to buy LFI Tokens with:</Text>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>

                <TouchableOpacity
                  style={styles.fundMethod}
                  onPress={ () => { navigation.navigate('FundCrypto')} }
                >

                  <View style={{flexDirection: 'row', margin: 5}}>
                    <Image
                      source={require('@assets/images/icon-eth.png')}
                      style={{height:32,width: 32, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('@assets/images/icon-btc.png')}
                      style={{height:30,width: 30, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={styles.setupIconText}>ETH or Bitcoin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.fundMethod}
                  onPress={ () => { navigation.navigate('FundBank')} }
                >
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5}}>

                    <Image
                      source={require('@assets/images/logo-chase.png')}
                      style={{height:25,width: 25, borderRadius: 5, margin: 3}}
                      resizeMode="contain"
                    />

                    <Image
                      source={require('@assets/images/logo-bofa.png')}
                      style={{height:25,width: 25, borderRadius: 5, margin: 3}}
                      resizeMode="contain"
                    />

                    <Image
                      source={require('@assets/images/logo-citi.png')}
                      style={{height:25,width: 25, borderRadius: 5, margin: 3}}
                      resizeMode="contain"
                    />

                  </View>
                  <Text style={styles.setupIconText}>Bank Account</Text>
                </TouchableOpacity>

              </View>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={styles.subHeadingText}>Bought LFI Coin in a Crypto Exchange?{'\n'}</Text>
              <View>
                <TouchableOpacity
                  style={styles.fundMethod}
                  onPress={ () => { navigation.navigate('ImportTokens')} }
                >
                    <Image
                      source={require('@assets/images/icon-exchange.png')}
                      style={styles.iconLFI}
                      resizeMode="contain"
                    />

                  <Text style={styles.setupIconText}>Import Tokens</Text>

                </TouchableOpacity>
              </View>
            </View>

            </View>

          </ScrollView>


          <View style={styles.footerRegion}>
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ () => { navigation.navigate('Home')} }
            >
              <Text style={styles.boldButton}>Complete Setup</Text>
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
    width: 150,
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
  iconLFI: {
    height: 50,
    width: 50,
    margin: 10,
  },
  setupIconText: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  bodyText: {
    fontSize: 17,
    fontFamily: 'OpenSansRegular',
  },
  footerRegion: {
    width: '100%',
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
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

export default ScreensWalletSetup;
