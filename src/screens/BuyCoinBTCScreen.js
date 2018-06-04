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

class BuyCoinBTCScreen extends Component {

  state: {
      balanceLFI: string,
      buyLFI: number,
      btcSellRate: number,
  }

  constructor() {
    super();
    this.state = {
      balanceLFI: '70,000',
      buyLFI: 1500,
      btcSellRate: .000000167,
    };
  }

  render() {

    const { navigation } = this.props;
    const { balanceLFI, buyLFI, btcSellRate } = this.state;

    let btcValue = buyLFI * btcSellRate;

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
            <Text style={styles.balanceBig}>{balanceLFI}</Text>
            </View>
        </View>

        <ScrollView style={{width: '100%'}}>

          <View style={styles.addFundsRow}>
              <Text style={styles.infoBold}>Add Funds in</Text>
              <TouchableOpacity
                style={styles.addFundsDisplay}
                onPress={() => { navigation.navigate("BuyCoinETH")} }
              >
                  <Image
                    source={require("../../assets/images/icon-btc.png")}
                    style={styles.BTCicon}
                    resizeMode="contain"
                  />
                  <Text style={styles.currecySelect}>Bitcoin</Text>
              </TouchableOpacity>
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
                placeholder={`${btcValue.toFixed(6)} BTC`}
                placeholderTextColor="rgba(0,0,0,0.5)"
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="numeric"
                style={styles.inputAmount}
                />

          </View>

          <View style={styles.walletRow}>
            <Text style={styles.infoBold}>Wallet</Text>
            <View style={styles.walletDisplay}>
              <Image
                source={require("../../assets/images/qrcode.png")}
                style={styles.walletQR}
                resizeMode="contain"
              />
              <Text>c0x1F1tAaz5xxqX</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <View style={styles.depositDisplay}>
              <Text style={styles.smallTextBold}>TOTAL</Text>
              <Text style={styles.smallText}>{btcValue.toFixed(6)} BTC</Text>
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
    justifyContent: 'flex-start',
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


export default BuyCoinBTCScreen;
