import PropTypes from 'prop-types'
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

// Amplify
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUser } from '@src/queries/GetUser'

class ScreensHome extends Component {

    state: {
        balanceUSD: string
    }

    constructor(props) {
      super(props);
      this.state = {
        balanceUSD: 15000,
        isLoading: true,
        idVerified: data.idVerified,
        walletSetup: false
      };
    }


    buyCoinHandler = () => {
      this.props.navigation.navigate('BuyCoin')
    }

    // To Do: Pull this into seperate function
    async componentWillMount() {

      const userInfo = await API.graphql(graphqlOperation(GetUser, { userId: 0 }))
      console.log(userInfo)

      const {
        name,
        age,
        sex,
        country
      } = userInfo.data.getUser;

      let userObj = {
        name: name,
        age: age,
        sex: sex,
        country: country
      }

      AsyncStorage.setItem('user', JSON.stringify(userObj))
      console.log(this.state.hasAuth)

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
            country: userData.country
          })
        } catch(error) {
          console.log(error)
      }

    }

    render() {

      const { navigation } = this.props;
      const { idVerified, balanceUSD, name, age, sex, country } = this.state;

      let multiple1 = data.lfiBalance * data.multipleFactor;
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

            <Text> {age} {sex}, {country}</Text>

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
                      values={{ n: data.lfiBalance }}
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
              <View style={styles.multiplySchedule}>

                <Text style={[styles.infoTextBold, {flex: 3}]}>LFI Multiply{'\n'}Schedule</Text>
                <Text style={[styles.infoText, {flex: 1}]}>
                  {data.multipleYear}{'\n'}
                  {data.multipleYear2}{'\n'}
                </Text>
                <Text style={[styles.infoText, {flex: 0.75}]}>
                  {data.multipleFactor}x{'\n'}
                  {data.multipleFactor2}x{'\n'}
                </Text>
                <Text style={[styles.infoText, {flex: 2, alignItems: 'flex-end'}]}>

                <Image
                    source={require('@assets/images/icon-lfi.png')}
                    style={{ marginHorizontal: 3, height: 18, width: 18}}
                    resizeMode="contain"
                  />
                  <FormattedMessage
                    id="multiple1"
                    defaultMessage={`{n, number}`}
                    values={{ n: multiple1 }}
                  /> {'\n'}

                <Image
                  source={require('@assets/images/icon-lfi.png')}
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
              onPress={ this.buyCoinHandler }
            >
                <Text style={styles.boldButton}>Buy LFI Coin</Text>
            </TouchableOpacity>

          </View>
          }


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

ScreensHome.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ScreensHome
