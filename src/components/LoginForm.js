import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

const LoginForm = () => (

  <View style={styles.loginForm}>
    <TextInput
      placeholder="Username or Email"
      placeholderTextColor="rgba(255,255,255,0.7)"
      underlineColorAndroid="rgba(0,0,0,0)"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="next"
      keyboardType="email-address"
      onSubmitEditing={() => passwordInput.focus()}
      style={styles.input}
      />

    <View style={styles.lineStyle} />

    <TextInput
      placeholder="Private Key"
      placeholderTextColor="rgba(255,255,255,0.7)"
      underlineColorAndroid="rgba(0,0,0,0)"
      secureTextEntry
      returnKeyType="go"
      style={styles.input}
      ref={(input) => passwordInput = input }
      onChangeText={value => onChangeText(value)}
      />

  </View>

);

const styles = StyleSheet.create({
  loginForm: {
    flex: 0.85,
    justifyContent: 'flex-end',
  },
  input: {
    height: 40,
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
  },
  lineStyle: {
    width: 250,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
    margin: 10,
  },
});

export default LoginForm;
