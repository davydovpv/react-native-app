import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import RegisterHeader from '../components/RegisterHeader';

class VerifyIDScreen extends Component {

    render() {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <RegisterHeader />

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require("../../assets/images/logo-netverify.png")}
              style={{width: 250, height: 100}}
              resizeMode="contain"
            />
          <Text style={{color: '#ccc'}}>Netverify API</Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <TouchableOpacity
              onPress={ () => { navigation.navigate("Register_3")} }
            >
              <Text style={{fontFamily: 'MontserratSemiBold', fontSize: 16}}>Proceed to Successful Verification{'\n'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ () => { navigation.navigate("Register_Fail")} }
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

export default VerifyIDScreen;
