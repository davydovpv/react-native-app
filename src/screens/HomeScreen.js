import PropTypes from "prop-types";
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';

import { IntlProvider, FormattedMessage } from 'react-intl';
import MainHeader from '../components/MainHeader';
import UserProfileHome from '../components/UserProfileHome';
import { BUTTON_COLOR } from '../styles/common';
import data from '../data';

class HomeScreen extends Component {

    state: {
        balanceUSD: string,
    }

    constructor(props) {
      super(props);
      this.state = {
        balanceUSD: 15000,
      };

    }

    render() {

      const { navigation } = this.props;
      const { balanceUSD } = this.state;
      let multiple1 = data.lfiBalance * data.multipleFactor;
      let multiple2 = multiple1 * 2;
      let multiple3 = multiple2 * 2;

      return (

      <IntlProvider
        locale="en"
        textComponent={Text}
        >

        <View style={styles.homeContainer}>
          <StatusBar barStyle="light-content" />

          <MainHeader />


          <View style={styles.profileRegion}>
            <UserProfileHome
              photo={require("../../assets/images/profile.png")}
              name={data.name}
            />

            <View style={styles.balance}>
              <View style={styles.balanceRow}>
                  <Image
                    source={require("../../assets/images/icon-lfi.png")}
                    style={styles.LFIicon}
                    resizeMode="contain"
                  />
                  <Text style={styles.balanceBig}>
                    <FormattedMessage
                      id="balanceLFI"
                      defaultMessage={` {n, number} `}
                      values={{ n: data.lfiBalance }}
                    />
                  </Text>
              </View>
              <View style={styles.balanceRow}>
                  <Image
                    source={require("../../assets/images/icon-usd.png")}
                    style={styles.USDicon}
                    resizeMode="contain"
                  />

                <Text style={styles.balanceUSD}>
                  <FormattedMessage
                    id="balanceUS"
                    defaultMessage={` {n, number} USD`}
                    values={{ n: balanceUSD }}
                  />
                </Text>

              </View>
            </View>
          </View>

          <View style={styles.infoRegion}>

            <View style={styles.multiplySchedule}>
              <Text style={[styles.infoTextBold, {flex: 3}]}>LFI Multiply{'\n'}Schedule</Text>
              <Text style={[styles.infoText, {flex: 1}]}>
                {data.multipleYear}{'\n'}
                {data.multipleYear + 5}{'\n'}
                {'\n'}
              </Text>
              <Text style={[styles.infoText, {flex: 0.75}]}>
                {data.multipleFactor}x{'\n'}
                {data.multipleFactor * 2}x{'\n'}
              </Text>
              <Text style={[styles.infoText, {flex: 2, alignItems: 'flex-end'}]}>

                <Image
                    source={require("../../assets/images/icon-lfi.png")}
                    style={{ marginHorizontal: 3, height: 18, width: 18}}
                    resizeMode="contain"
                  />
                  <FormattedMessage
                    id="multiple1"
                    defaultMessage={`{n, number}`}
                    values={{ n: multiple1 }}
                  /> {'\n'}

                <Image
                  source={require("../../assets/images/icon-lfi.png")}
                  style={{ marginHorizontal: 3, height: 18, width: 18}}
                  resizeMode="contain"
                />
                <FormattedMessage
                  id="multiple2"
                  defaultMessage={`{n, number}`}
                  values={{ n: multiple2 }}
                /> {'\n'}

              </Text>
            </View>

            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={() => { navigation.navigate('BuyCoin')}}
            >
                <Text style={styles.boldButton}>Buy LFI Coin</Text>
            </TouchableOpacity>
          </View>


        </View>

      </IntlProvider>
      );
    }

}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileRegion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  balance: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  balanceBig: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 25,
  },
  LFIicon: {
    marginHorizontal: 5,
    height: 30,
    width: 30,
  },
  LFIiconSM: {
    marginHorizontal: 3,
    height: 18,
    width: 18,
  },
  balanceUSD: {
    fontFamily: 'OpenSansRegular',
    fontSize: 15,
    fontWeight: '200',
  },
  USDicon: {
    marginHorizontal: 5,
    height: 20,
    width: 20,
  },
  infoRegion: {
    width: '100%',
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiplySchedule:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoTextBold: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
  },
  infoText: {
    fontFamily: 'OpenSansRegular',
    fontSize: 16,
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

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default HomeScreen;
