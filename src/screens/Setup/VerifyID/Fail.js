import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import SetupHeader from '@src/components/Setup/Header';
import { ButtonLogin } from '@src/components/Forms/Buttons';
import data from '@src/data';


class ScreensVerifyIDFail extends Component {

    failedVerifyIDHandler = () => {
      this.props.navigation.navigate('ContactSupport')
    }

    render() {

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <SetupHeader />

          <View style={styles.headingRow}>
            <Text style={styles.headingText}>Identify Not Verified</Text>
            <Image
              source={require('@assets/images/icon-warning.png')}
              style={styles.iconShield}
              resizeMode='contain'
            />

          </View>

          <ScrollView>
          <View style={styles.body}>

            <Text style={styles.bodyText}>
              Dear {data.name}, {'\n'}
              {'\n'}
              Your identify could not be verified via NETVERIFY. Please contact us to complete your registration manually.
              {'\n'}{'\n'}
              For security reasons and to maintain the integrity of our network, we verify every member's identity. After successfully verifying your identity, you'll have full access to the Life Insure App.{'\n'}
              {'\n'}
              Thank you for your patience,{'\n'}
            </Text>

            <Image
              source={require('@assets/images/signature.png')}
              style={{height:80, width: 120}}
              resizeMode="contain"
            />

            <Text style={styles.bodyText}>
              David Moyal{'\n'}
              Founder, LFI
            </Text>

          </View>
          </ScrollView>

          <View style={styles.footer}>
            <ButtonLogin
              buttonLabel="Contact LFI Support"
              onPressHandler={ this.failedVerifyIDHandler }
            />
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
    backgroundColor: '#fff'
  },
  headingRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 30,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headingText: {
    fontSize: 20,
    fontFamily: 'MontserratSemiBold'
  },
  iconShield: {
    height: 30,
    width: 30,
    marginLeft: 10
  },
  body: {
    flex: 1,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bodyText: {
    fontSize: 15,
    fontFamily: 'OpenSansRegular',
  },
  footer: {
    width: '100%',
    padding: 20,
  }
});

export default ScreensVerifyIDFail;
