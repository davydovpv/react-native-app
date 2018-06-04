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
import MainHeader from '../components/MainHeader';
import UserProfileHome from '../components/UserProfileHome';
import { BUTTON_COLOR } from '../styles/common';

class HomeScreen extends Component {

    state: {
        balanceLFI: string,
        balanceUSD: string,
        multipleLFI: string,
        multipleYearLFI: number,
    }

    constructor(props) {
      super(props);
      this.state = {
        balanceLFI: '70,000',
        balanceUSD: '$15,000',
        multipleLFI: '2',
        multipleYearLFI: 2023
      };

    }

    render() {

      const { navigation } = this.props;
      const { balanceLFI, balanceUSD, multipleLFI, multipleYearLFI } = this.state;

      return (
        <View style={styles.homeContainer}>
          <StatusBar barStyle="light-content" />

          <MainHeader />

          <UserProfileHome
            photo={require("../../assets/images/profile.png")}
            name="Adam Rosen"
          />

          <View style={styles.balance}>
            <View style={styles.balanceRow}>
                <Text style={styles.balanceBig}>{balanceLFI}</Text>
                <Image
                  source={require("../../assets/images/icon-lfi.png")}
                  style={styles.LFIicon}
                  resizeMode="contain"
                />
            </View>
            <View style={styles.balanceRow}>
                <Image
                  source={require("../../assets/images/icon-usd.png")}
                  style={styles.USDicon}
                  resizeMode="contain"
                />
              <Text style={styles.balanceUSD}>USD {balanceUSD}</Text>
            </View>
          </View>

          <View style={styles.infoRegion}>
            <Text style={styles.infoText}>Your LFI balance multiplies {multipleLFI}x in {multipleYearLFI}</Text>

            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={() => { navigation.navigate("BuyCoin")}}
            >
                <Text style={styles.boldButton}>Buy LFI Coin</Text>
            </TouchableOpacity>
          </View>


        </View>

      );
    }

}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balance: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 5,
    height: 30,
    width: 30,
  },
  balanceUSD: {
    fontFamily: 'OpenSansRegular',
    fontSize: 15,
    fontWeight: '200',
  },
  USDicon: {
    marginRight: 5,
    height: 20,
    width: 20,
  },
  infoRegion: {
    height: 200,
    width: '100%',
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'OpenSansRegular',
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
    marginTop: 30,
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
