import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
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

const ButtonLoginText = ({ buttonLabel, onPressHandler, textType="bold" }) => (
  <View>
  { textType === "light" &&
  <TouchableOpacity
    style={{paddingVertical: 25}}
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
    height: 65,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 15,
    paddingVertical: 20,
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

export { ButtonLogin, ButtonLoginSmall, ButtonLoginText } ;
