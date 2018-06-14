import PropTypes from "prop-types";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { withNavigation } from 'react-navigation';

const RegisterHeader = ({ navigation, ...props})  => (

    <View style={styles.headerContainer}>

        <TouchableOpacity
          onPress={() => { navigation.goBack()}}
          style={{padding:10}}
        >
          <Image
            source={require("../../../assets/images/arrow-left.png")}
            style={styles.iconLeft}
            resizeMode="contain"
          />
        </TouchableOpacity>


        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={() => { navigation.navigate("LoginHandler")}}
          style={{padding:10}}
        >
          <Image
            source={require("../../../assets/images/icon-close.png")}
            style={styles.iconRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
    </View>

);



const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#1E4072',
    padding: 20,
    paddingTop: 40,
  },
  iconLeft: {
    height: 20,
    width: 20,
    tintColor: '#fff'
  },
  logo: {
      width: 125,
      height: 25,
  },
  iconRight: {
    height: 18,
    width: 18,
    tintColor: '#fff'
  },
});


export default withNavigation(RegisterHeader);
