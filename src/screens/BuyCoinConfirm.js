import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { IntlProvider, FormattedMessage } from 'react-intl';
import MainHeader from '../components/MainHeader';
import data from '../data';


class BuyConfirmScreen extends Component {

  updateBalanceJSON() {
      data.lfiBalance = parseInt(data.lfiBalance) + parseInt(data.buyLFIAmount)
  }

  render() {

    const { navigation } = this.props;

    return (
    <IntlProvider
      locale="en"
      textComponent={Text}
      >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MainHeader />

        <View style={styles.headingRow}>
            <Text style={styles.headingBold}>LFI Purchase Confirmed</Text>
            <Image
              source={require("../../assets/images/icon-checked.png")}
              style={styles.LFIicon}
              resizeMode="contain"
            />
        </View>

        <ScrollView style={{width: '100%'}}>

          <View style={styles.addFundsRow}>
              <Text style={styles.infoBold}>You Added</Text>
                <View style={styles.totalDisplay}>
                  <Image
                    source={require("../../assets/images/icon-lfi.png")}
                    style={styles.LFIicon}
                    resizeMode="contain"
                  />
                <Text style={styles.addTotalLFI}>
                  <FormattedMessage
                    id="balanceLFI"
                    defaultMessage={` {n, number} `}
                    values={{ n: data.buyLFIAmount }}
                  />
                </Text>
                </View>
          </View>

          <View style={styles.walletRow}>
            <Text style={styles.infoBold}>To Wallet</Text>
            <View style={styles.walletDisplay}>
              <Text>c0x1F1tAaz5xxqX</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.infoBold}>New Balance</Text>
              <View style={styles.totalDisplay}>
                <Image
                  source={require("../../assets/images/icon-lfi.png")}
                  style={styles.LFIicon}
                  resizeMode="contain"
                />
              <Text style={styles.addTotalLFI}>
                <FormattedMessage
                  id="balanceLFI"
                  defaultMessage={` {n, number} `}
                  values={{ n: parseInt(data.lfiBalance) + parseInt(data.buyLFIAmount) }}
                />
              </Text>
            </View>
          </View>

          <View style={styles.addFundsRow}>

          </View>

        </ScrollView>

        <View style={styles.buyRow}>
          <TouchableOpacity
            style={styles.buttonBuy}
            onPress={() => {
              this.updateBalanceJSON(),
              navigation.popToTop(),
              navigation.navigate('Home')}
            }
          >
            <Text style={styles.boldButton}>
              Go to Wallet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </IntlProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headingRow: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headingBold: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    alignItems: 'center',
  },
  LFIicon: {
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  infoBold: {
    flex: 0.5,
    fontFamily: 'MontserratBold',
    fontSize: 16,
  },
  balanceDisplay: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  balanceBig: {
    fontSize: 30,
    fontFamily: 'MontserratBold',
  },
  addFundsRow: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addFundsDisplay: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencySelect: {
    fontFamily: 'MontserratBold',
  },
  amountRow: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(225,225,225,0.5)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
  },
  inputAmount: {
    flex: 1,
    height: 40,
    fontSize: 18,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  amountEqual: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  walletDisplay: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  walletQR: {
    height: 100,
    width: 100,
    marginBottom: 5,
  },
  totalRow: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  depositDisplay: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  smallText: {
    fontSize: 12,
  },
  smallTextBold: {
    fontWeight: '700',
    fontSize: 12,
  },
  totalDisplay: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addTotalLFI: {
    fontSize: 30,
    fontFamily: 'MontserratSemiBold',
  },
  buyRow: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
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
    backgroundColor: '#2FB87E',
    borderRadius: 15,
    paddingVertical: 20,
    height: 65,
  },

});


export default BuyConfirmScreen;
