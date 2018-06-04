import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';


class LoginScreen extends Component {

    async componentDidMount() {
      const {
        navigation: { navigate },
      } = this.props;
    }

    render() {

      const { navigation } = this.props;

      loginHandler = () => {
        navigation.navigate("Home");
      }

      registerHandler = () => {
        navigation.navigate("Register");
      }

      return (
        <View style={styles.loginContainer}>

            <StatusBar barStyle="light-content" />


              <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>

                  <View style={styles.loginLogo}>
                    <Image
                      source={require("../../assets/images/logo.png")}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                    <Image
                      source={require("../../assets/images/slogan.png")}
                      style={styles.slogan}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.loginForm}>
                    <TextInput
                      placeholder="Username or Email"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      underlineColorAndroid="rgba(0,0,0,0)"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      keyboardType="email-address"
                      onSubmitEditing={() => this.passwordInput.focus()}
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
                      ref={(input) => this.passwordInput = input }
                      />
                  </View>

              </KeyboardAvoidingView>

              <View style={styles.footer}>

                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={loginHandler}>
                  <Text style={styles.boldButton}>login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={registerHandler}>
                  <Text style={styles.boldButton}>create account</Text>
                </TouchableOpacity>

                <Text style={styles.copyright}>
                  {'\u00A9'} 2018 lifeinsure.io
                </Text>

              </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E4072',
    padding: 20,
  },
  loginLogo: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 225,
    height: 50,
  },
  slogan: {
    width: 225,
    height: 40,
  },
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
  body: {
    flex: 4,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  boldButton: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
  },
  buttonLogin: {
    backgroundColor: '#2FB87E',
    borderRadius: 15,
    paddingVertical: 20,
    height: 65,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {
    marginTop: 5,
    paddingVertical: 20,
  },
  copyright: {
    marginTop: 20,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  }
});



export default LoginScreen;
