import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import RegisterHeader from '@src/components/Register/Header';

class ScreensRegisterVerifyID extends Component {

    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RegisterHeader />

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('@assets/images/logo-netverify.png')}
              style={{width: 250, height: 100}}
              resizeMode="contain"
            />
          <Text style={{color: '#ccc'}}>Netverify API</Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <TouchableOpacity
              onPress={ () => { navigation.navigate('Success')} }
            >
              <Text style={{fontFamily: 'MontserratSemiBold', fontSize: 16}}>Proceed to Successful Verification{'\n'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ () => { navigation.navigate('Fail')} }
            >
              <Text>Show Failed Verification</Text>
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
    backgroundColor: '#fff'
  },
});

export default ScreensRegisterVerifyID;
