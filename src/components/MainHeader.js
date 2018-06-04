import PropTypes from "prop-types";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { DrawerActions, withNavigation } from 'react-navigation';

const MainHeader = ({ navigation, ...props}) => (

    <View style={styles.headerContainer}>

        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer()) }
        >

          <Image
            source={require("../../assets/images/icon-menu.png")}
            style={styles.iconMenu}
            resizeMode="contain"
          />
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => { navigation.navigate("Home")} }
        >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/images/icon-info-white.png")}
            style={styles.iconInfo}
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
  iconMenu: {
    height: 20,
    width: 20,
  },
  logo: {
      width: 125,
      height: 25,
  },
  iconInfo: {
    height: 28,
    width: 30,
  },
});


export default withNavigation(MainHeader);
