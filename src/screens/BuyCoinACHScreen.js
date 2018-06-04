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

import MainHeader from '../components/MainHeader';
import data from '../data';

class BuyCoinACHScreen extends Component {

  state: {
      buyLFI: number,
      usdSellRate: number,
  }

  constructor() {
    super();
    this.state = {
      buyLFI: 1500,
      usdSellRate: .16074,
    };
  }

  render() {

    const { navigation } = this.props;
    const { buyLFI, usdSellRate } = this.state;

    let tradeValue = buyLFI * usdSellRate;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MainHeader
          openSidemenu = {() => { navigation.navigate("DrawerOpen")}}
        />

        <View style={styles.balanceRow}>
            <Text style={styles.headingBold}>LFI Balance</Text>
            <View style={styles.balanceDisplay}>
              <Image
                source={require("../../assets/images/icon-lfi.png")}
                style={styles.LFIicon}
                resizeMode="contain"
              />
            <Text style={styles.balanceBig}>{data.lfiBalance}</Text>
            </View>
        </View>

        <ScrollView style={{width: '100%'}}>

          <View style={styles.addFundsRow}>
              <Text style={styles.infoBold}>Add Funds in</Text>
              <View style={styles.addFundsDisplay}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate("BuyCoinETH")}}
                  style={{padding: 10, marginLeft: -5}}
                >
                    <Image
                      source={require("../../assets/images/arrow-left.png")}
                      style={{height:15, width: 15}}
                      resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { navigation.navigate("BuyCoinBTC")}}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require("../../assets/images/icon-usd.png")}
                    style={styles.BTCicon}
                    resizeMode="contain"
                  />
                  <Text style={styles.currecySelect}>USD</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { navigation.navigate("BuyCoinBTC")}}
                  style={{padding: 10, marginRight: -5}}
                >
                    <Image
                      source={require("../../assets/images/arrow-right.png")}
                      style={{height:15, width: 15}}
                      resizeMode="contain"
                    />
                </TouchableOpacity>
              </View>
          </View>

          <View style={styles.amountRow}>
              <TextInput
                placeholder="1,500 LFI"
                placeholderTextColor="rgba(0,0,0,0.7)"
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="numeric"
                style={styles.inputAmount}
                onChangeText={(buyLFI) => this.setState({buyLFI})}
                value={this.state.buyLFI.toString()}
                />

              <Text style={styles.amountEqual}> = </Text>

              <TextInput
                placeholder={`${tradeValue.toFixed(2)} USD`}
                placeholderTextColor="rgba(0,0,0,0.5)"
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="numeric"
                style={styles.inputAmount}
                />

          </View>

          <View style={styles.bankRow}>
            <Text style={styles.infoBold}>Debit from</Text>
              <View style={styles.bankDisplay}>
                <Image
                  source={require("../../assets/images/logo-bofa.png")}
                  style={styles.bankIcon}
                  resizeMode="contain"
                />
              <Text>{data.bankDetail[0].accountName} {"\n"}xx-{data.bankDetail[0].bank5digit}</Text>
              </View>
          </View>

          <View style={styles.walletRow}>
            <Text style={styles.infoBold}>Wallet</Text>
            <View style={styles.walletDisplay}>
              <Text>c0x1F1tAaz5xxqX</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <View style={styles.depositDisplay}>
              <Text style={styles.smallTextBold}>TOTAL</Text>
              <Text style={styles.smallText}>{tradeValue.toFixed(2)} USD</Text>
            </View>
            <View style={styles.totalDisplay}>
              <Image
                source={require("../../assets/images/icon-lfi.png")}
                style={styles.LFIicon}
                resizeMode="contain"
              />
            <Text style={styles.addTotalLFI}>{buyLFI}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buyRow}>
          <TouchableOpacity
            style={styles.buttonBuy}
            onPress={() => { navigation.navigate("BuyConfirm")} }
          >
            <Text style={styles.boldButton}>Buy {buyLFI} LFI</Text>
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
    backgroundColor: 'white',
  },
  headingBold: {
    flex: 0.5,
    fontFamily: 'MontserratBold',
    fontSize: 20,
    alignItems: 'center',
  },
  infoBold: {
    flex: 0.5,
    fontFamily: 'MontserratBold',
    fontSize: 16,
  },
  balanceRow: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  bankRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  bankDisplay: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bankIcon: {
    height: 35,
    width: 35,
    borderRadius: 5,
    marginRight: 10,
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
  LFIicon: {
    marginRight: 5,
    height: 30,
    width: 30,
  },
  BTCicon: {
    marginRight: 5,
    height: 30,
    width: 30,
  },
  ETHicon: {
    marginRight: 5,
    height: 30,
    width: 30,
  },
});


export default BuyCoinACHScreen;
