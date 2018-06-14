import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const UserProfileHome = ({ photo, name }) => (

      <View style={styles.profile}>
        <Image
          source={photo}
          style={styles.profilePic}
          resizeMode="contain"
        />
      <Text style={styles.profileName}>{name}</Text>
      </View>

);

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
      width: 175,
      height: 175,
      borderRadius: 15,
      margin: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600'
  }
});


export default UserProfileHome;
