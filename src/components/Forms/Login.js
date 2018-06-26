import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';

const FieldLogin = ({ placeholder, name, secure, onChangeHandler }) => (
  <TextInput
    placeholder={ placeholder }
    placeholderTextColor="rgba(255,255,255,0.7)"
    underlineColorAndroid="rgba(0,0,0,0)"
    style={styles.input}
    autoCorrect={false}
    autoCapitalize="none"
    secureTextEntry={ secure }
    onChangeText={ onChangeHandler }
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)'
  }
});

export { FieldLogin } ;
