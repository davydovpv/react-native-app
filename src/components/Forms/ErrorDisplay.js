import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const ErrorDisplay = ({ error=null, formType="Login" }) => (

    <View>

    { error !== null &&
      <View style={styles.footerBlock}>
        { formType === "Register" &&
          <Text style={[styles.errorText, styles.errorRegister]}>{ error } </Text>
        }
        { formType === "Login" &&
          <Text style={[styles.errorText, styles.errorLogin]}>{ error }</Text>
        }
      </View>
    }

  </View>

);

const styles = StyleSheet.create({
  footerBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250
  },
  errorText: {
    color: 'hotpink',
    fontSize: 15
  },
  errorRegister: {
    marginBottom: 20,
  },
  errorLogin: {
    paddingVertical: 15,
  },
});

export default ErrorDisplay;
