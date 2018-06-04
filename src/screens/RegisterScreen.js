import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

class RegisterScreen extends Component {

    render() {

      return (

        <View style={styles.homeContainer}>
          <StatusBar barStyle="dark-content" />
          <Text>Register</Text>
        </View>

      );
    }

}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
