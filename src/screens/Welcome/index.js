import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';

import data from '@src/data';

// Amplify
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUserWelcome } from '@src/queries/GetUser'

// UI
import SetupHeaderInitial from '@src/components/Setup/HeaderInitial'
import UserProfileHome from '@src/components/User/ProfileHome'
import { SetupIcon } from '@src/components/UI/Common';
import { ButtonLogin } from '@src/components/Forms/Buttons';


class ScreensWelcome extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        hasVerifiedID: '',
        name: '',
        first_name: '',
        country: ''
      };
    }

    getStartedHandler = () => {
      this.props.navigation.navigate('VerifyID')
    }

    verifyIDHandler = () => {
      this.props.navigation.navigate('VerifyID')
    }

    setupWalletHandler = () => {
      this.props.navigation.navigate('SetupWallet')
    }

    async componentWillMount() {

      const userInfo = await API.graphql(graphqlOperation(GetUserWelcome, { userId: data.id }))

      const {
        name,
        country,
        has_verified_id,
        has_wallet_setup
      } = userInfo.data.getUser;

      let userObj = {
        name: name,
        country: country,
        has_verified_id: has_verified_id,
        has_wallet_setup: has_wallet_setup
      }

      this.setState({
        isLoading: false,
        name: userObj.name,
        first_name: userObj.name.split(" ", 1),
        country: userObj.country,
        hasVerifiedID: userObj.has_verified_id,
        hasWalletSetup: userObj.has_wallet_setup
      })

      AsyncStorage.setItem('user', JSON.stringify(userObj))

    }

    async componentDidMount() {

      try {
          let userJSON = await AsyncStorage.getItem('user')
          let userData = JSON.parse(userJSON)

          this.setState({
            isLoading: false,
            name: userData.name,
            first_name: userData.name.split(" ", 1),
            country: userData.country,
            hasVerifiedID: userData.hasVerifiedID
          })
        } catch(error) {
          console.log(error)
      }

    }

    render() {

      const { navigation } = this.props;
      const { name, first_name, country, hasVerifiedID, hasWalletSetup } = this.state;

      return (

        <View style={styles.homeContainer}>
          <StatusBar barStyle="light-content" />

          <SetupHeaderInitial />

          <View style={styles.headerRegion}>
            <Text style={styles.headerText}>Welcome to LFI</Text>
            <Image
              source={require('@assets/images/icon-lfi.png')}
              style={styles.iconLFI}
              resizeMode="contain"
            />
          </View>

          <ScrollView>
            <View>

              <View style={styles.infoRegion}>
                <Text style={styles.infoText}>
                  Hi {first_name}! {"\n"}{"\n"}
                  To get started, as a resident of {country} you must complete the following steps to create a Life Insure account.
                </Text>
              </View>

              <View style={styles.setupRegion}>

                <SetupIcon
                  iconLabel="Verify Identity"
                  imageSource={require('@assets/images/icon-idcard.png')}
                  onPressHandler={ this.verifyIDHandler }
                />

                <SetupIcon
                  iconLabel="Setup LFI Wallet"
                  imageSource={require('@assets/images/icon-wallet2.png')}
                  onPressHandler={ this.setupWalletHandler }
                />

              </View>

            </View>
          </ScrollView>

          <View style={styles.footerRegion}>
            <ButtonLogin
              onPressHandler={ this.getStartedHandler }
              buttonLabel="Get Started"
            />
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
    backgroundColor: '#fff'
  },
  headerRegion: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20
  },
  headerText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 25,
  },
  iconLFI: {
    height: 40,
    width: 40,
    margin: 10,
  },
  infoRegion: {
    padding: 20,
  },
  setupRegion: {
    flex: 1,
    margin: 20,
    flexDirection: 'row'
  },
  infoTextBold: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
  },
  infoText: {
    fontFamily: 'OpenSansRegular',
    fontSize: 17,
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
});

export default ScreensWelcome
