import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const UserProfileHome = ({ photo, size, name }) => (

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
      height: 175,
      width: 175,
      borderRadius: 25,
      margin: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600'
  }
});


export default UserProfileHome;
