import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';

import { IntlProvider, FormattedMessage } from 'react-intl'

import data from '@src/data'
import MainHeader from '@src/components/MainHeader'
import UserProfileHome from '@src/components/User/ProfileHome'
import { BUTTON_COLOR } from '@src/styles/common'

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUser } from '@src/queries/GetUser'

class ScreensHome extends Component {

    state: {
        name: '',
        age: '',
        sex: '',
        city: '',
        state: '',
        country: '',
        lfi_balance: ''
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        idVerified: data.idVerified
      };
    }

    buyCoinHandler = () => {
      this.props.navigation.navigate('BuyCoin')
    }


    async componentWillMount() {

      const userInfo = await API.graphql(graphqlOperation(GetUser, { userId: data.id }))
      console.log(userInfo)

      const {
        name,
        age,
        sex,
        city,
        state,
        country,
        lfi_balance
      } = userInfo.data.getUser;

      let userObj = {
        name: name,
        age: age,
        sex: sex,
        city: city,
        state: state,
        country: country,
        lfi_balance: lfi_balance
      }

      this.setState({
        isLoading: false,
        name: userObj.name,
        age: userObj.age,
        sex: userObj.sex,
        city: userObj.city,
        state: userObj.state,
        country: userObj.country,
        lfi_balance: userObj.lfi_balance
      })

      data.name = this.state.name;
      data.city = this.state.city;
      data.state = this.state.state;
      data.lfiBalance = this.state.lfi_balance;

      AsyncStorage.setItem('user', JSON.stringify(userObj))
      console.log(userObj)

    }

    async componentDidMount() {

      try {
          let userJSON = await AsyncStorage.getItem('user')
          let userData = JSON.parse(userJSON)
          this.setState({
            isLoading: false,
            name: userData.name,
            age: userData.age,
            sex: userData.sex,
            city: userData.city,
            state: userData.state,
            country: userData.country,
            lfi_balance: userData.lfi_balance
          })
        } catch(error) {
          console.log(error)
      }

    }

    render() {

      const { navigation } = this.props;
      const { idVerified, name, age, sex, city, state, country, lfi_balance } = this.state;

      let balanceUSD = lfi_balance / 100;
      let multiple1 = lfi_balance * data.multipleFactor;
      let multiple2 = multiple1 * 2;

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
              photo={require('@assets/images/profile.png')}
              name={ name }
            />

          <Text> {city}, {state}</Text>

            <View style={styles.balance}>
              <View style={styles.balanceRow}>
                  <Image
                    source={require('@assets/images/icon-lfi.png')}
                    style={styles.LFIicon}
                    resizeMode="contain"
                  />
                  <Text style={styles.balanceBig}>
                    <FormattedMessage
                      id="balanceLFI"
                      defaultMessage={` {n, number} `}
                      values={{ n: lfi_balance }}
                    />
                  </Text>
              </View>

              <View style={styles.balanceRow}>
                <Image
                  source={require('@assets/images/icon-usd.png')}
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
              <View style={{flexDirection: 'row'}}>

                <View style={{flex: 0.3, marginRight: 15}}>
                  <Text style={styles.infoTextBold}>LFI Multiply{'\n'}Schedule</Text>
                </View>

                <View style={{flex: 0.70, height: 70}}>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.infoText, {flex: 1}]}>
                      {data.multipleYear}
                    </Text>
                    <Text style={[styles.infoText, {flex: 0.75}]}>
                      {data.multipleFactor}x
                    </Text>
                    <Text style={[styles.infoText, {flex: 2, alignItems: 'flex-end'}]}>
                      <Image
                          source={require('@assets/images/icon-lfi.png')}
                          style={{ marginHorizontal: 5, height: 18, width: 18}}
                          resizeMode="contain"
                        />
                      <FormattedMessage
                        id="multiple1"
                        defaultMessage={`{n, number}`}
                        values={{ n: multiple1 }}
                      />
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.infoText, {flex: 1}]}>
                      {data.multipleYear2}
                    </Text>
                    <Text style={[styles.infoText, {flex: 0.75}]}>
                      {data.multipleFactor2}x
                    </Text>
                    <Text style={[styles.infoText, {flex: 2, alignItems: 'flex-end'}]}>
                      <Image
                          source={require('@assets/images/icon-lfi.png')}
                          style={{ marginHorizontal: 5, height: 18, width: 18}}
                          resizeMode="contain"
                        />
                      <FormattedMessage
                        id="multiple1"
                        defaultMessage={`{n, number}`}
                        values={{ n: multiple2 }}
                      />
                    </Text>
                  </View>

              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ this.buyCoinHandler }
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
    marginBottom: 15
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

export default ScreensHome
