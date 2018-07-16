import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  BUTTON_COLOR,
  FONT_HEADLINE_SEMIBOLD
} from '@src/styles/common';

const ButtonLogin = ({ buttonLabel, onPressHandler }) => (
  <TouchableOpacity
    style={styles.buttonLogin}
    onPress={ onPressHandler }>
    <Text style={styles.labelBold}> {buttonLabel} </Text>
  </TouchableOpacity>
);

const ButtonLoginSmall = ({ buttonLabel, onPressHandler }) => (
  <TouchableOpacity
    style={styles.buttonLoginSM}
    onPress={ onPressHandler }>
    <Text style={styles.labelBoldSM}> {buttonLabel} </Text>
  </TouchableOpacity>
);

const ButtonRegister = ({ buttonLabel, onPressHandler }) => (
  <TouchableOpacity
    style={styles.buttonRegister}
    onPress={ onPressHandler }>
    <Text style={styles.labelBold}> {buttonLabel} </Text>
  </TouchableOpacity>
);

const ButtonLoginText = ({ buttonLabel, onPressHandler, textType="bold" }) => (
  <View>
  { textType === "light" &&
  <TouchableOpacity
    style={{paddingVertical: 20}}
    onPress={ onPressHandler }
    >
    <Text style={styles.labelLight}> {buttonLabel} </Text>
  </TouchableOpacity>
  }

  { textType === "bold" &&
  <TouchableOpacity
    style={{marginTop: 5, paddingVertical: 20}}
    onPress={ onPressHandler }>
    <Text style={styles.labelBold}> {buttonLabel} </Text>
  </TouchableOpacity>
  }
  </View>
);

const styles = StyleSheet.create({
  buttonLogin: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 15,
    paddingVertical: 15,
  },
  buttonLoginSM: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 15,
    paddingVertical: 10,
  },
  buttonRegister: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  labelBold: {
    fontFamily: FONT_HEADLINE_SEMIBOLD,
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
  },
  labelBoldSM: {
    fontFamily: FONT_HEADLINE_SEMIBOLD,
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
  },
  labelLight: {
    fontSize: 16,
    color: 'rgba(255,255,255,1)'
  }
});

export { ButtonLogin, ButtonLoginSmall, ButtonRegister, ButtonLoginText } ;
