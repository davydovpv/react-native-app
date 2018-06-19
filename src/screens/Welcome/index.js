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

// Amplify
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUserWelcome } from '@src/queries/GetUser'

// UI
import SetupHeaderInitial from '@src/components/Setup/HeaderInitial'
import UserProfileHome from '@src/components/User/ProfileHome'
import { BUTTON_COLOR } from '@src/styles/common'

class ScreensWelcome extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
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

      const userInfo = await API.graphql(graphqlOperation(GetUserWelcome, { userId: 0 }))
      const {
        name,
        country
      } = userInfo.data.getUser;

      let userObj = {
        name: name,
        country: country
      }

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
            country: userData.country
          })
        } catch(error) {
          console.log(error)
      }
    }

    render() {

      const { navigation } = this.props;
      const { name, first_name, country, hasVerifiedID } = this.state;

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

          <View style={styles.infoRegion}>
            <Text style={styles.infoText}>
              Hi {first_name}! {"\n"}{"\n"}
              To get started, as a resident of {country} you must complete the following steps to create a Life Insure account.
            </Text>
          </View>

          <View style={styles.setupRegion}>
            <TouchableOpacity
              onPress={ this.verifyIDHandler }
              style={styles.setupIcon}
              >
              <Image
                source={require('@assets/images/icon-idcard.png')}
                style={{width:50,height:50}}
                resizeMode="contain"
              />
              <Text style={styles.setupIconText}>Verify Identity</Text>
              { this.state.hasVerifiedID &&
                <Text>Verified</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ this.setupWalletHandler }
              style={styles.setupIcon}
              >
              <Image
                source={require('@assets/images/icon-wallet2.png')}
                style={{width:50,height:50}}
                resizeMode="contain"
              />

              <Text style={styles.setupIconText}>Setup LFI Wallet</Text>
            </TouchableOpacity>

          </View>


          <View style={styles.footerRegion}>
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={ this.getStartedHandler }
              >
              <Text style={styles.boldButton}>Get Started</Text>
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
  setupIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    width: 140,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  setupIconText: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    textAlign: 'center',
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

ScreensWelcome.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ScreensWelcome
