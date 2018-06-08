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

class BuyCoinBTCScreen extends Component {

  state: {
      buyLFI: number,
  }

  constructor() {
    super();
    this.state = {
      buyLFI: 1500,
    };
  }

  loadData() {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC')
    .then(response => response.json())
    .then(json => {
      this.setState({
        BTC: json.BTC * data.lfiUSD
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async componentDidMount() {
    
    this.setState ({
      BTC: data.lfiBTC
    });

    this.loadData();

  }

  render() {

    const { navigation } = this.props;
    const { buyLFI, BTC } = this.state;

    let tradeValue = buyLFI * BTC;

    return (
    <IntlProvider
      locale="en"
      textComponent={Text}
      >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MainHeader />

        <View style={styles.balanceRow}>
            <Text style={styles.headingBold}>LFI Balance</Text>
            <View style={styles.balanceDisplay}>
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
        </View>

        <ScrollView style={{width: '100%'}}>

          <View style={styles.addFundsRow}>
              <Text style={styles.infoBold}>Add Funds in</Text>
              <View style={styles.addFundsDisplay}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate("BuyCoinACH")}}
                  style={{padding: 10, marginLeft: -5}}
                >
                    <Image
                      source={require("../../assets/images/arrow-left.png")}
                      style={{height:15, width: 15}}
                      resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { navigation.navigate("BuyCoinETH")}}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require("../../assets/images/icon-btc.png")}
                        style={styles.BTCicon}
                        resizeMode="contain"
                      />
                      <Text style={styles.currecySelect}>Bitcoin</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { navigation.navigate("BuyCoinETH")}}
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
                placeholder={`${tradeValue.toFixed(6)} BTC`}
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
              <Text style={styles.smallText}>{tradeValue.toFixed(6)} BTC</Text>
            </View>
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
                values={{ n: buyLFI }}
              />
            </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buyRow}>
          <TouchableOpacity
            style={styles.buttonBuy}
            onPress={() => { navigation.navigate("BuyConfirm")} }
          >
            <Text style={styles.boldButton}>
              Buy
              <FormattedMessage
                id="balanceLFI"
                defaultMessage={` {n, number} `}
                values={{ n: buyLFI }}
              />
              LFI
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
