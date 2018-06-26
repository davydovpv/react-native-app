import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const SetupIcon = ({ iconLabel, imageSource, onPressHandler }) => (
  <TouchableOpacity
    onPress={ onPressHandler }
    style={styles.setupIcon}
    >
    <Image
      source={imageSource}
      style={{width:50,height:50}}
      resizeMode="contain"
    />
    <Text style={styles.setupIconText}> {iconLabel} </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export { SetupIcon } ;
