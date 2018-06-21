import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const UserProfile = ({ photo, name, location, color }) => (
    <View style={styles.profileContent}>
      <Image
        source={photo}
        style={styles.profilePic}
        resizeMode="contain"
      />
      <View>
        <Text style={ [styles.profileInfoBold, {color}] }>{name}</Text>
        <Text style={ [styles.profileInfo, {color}] }>{location}</Text>
        <Text style={ [styles.profileInfo, {color}] }>Joined 2018</Text>
      </View>
    </View>
);


const styles = StyleSheet.create({
  profileContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  profilePic: {
    height: 80,
    width: 80,
  },
  profileInfoBold: {
    fontFamily: 'OpenSansBold',
  },
  profileInfo: {
    fontFamily: 'OpenSansRegular',
  },
  white: {
    color: 'rgba(255,255,255,1)'
  },
  black: {
    color: 'rgba(0,0,0,1)'
  }
});

export default UserProfile;
