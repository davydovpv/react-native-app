import React, { Component } from 'react'
import Swiper from 'react-native-swiper'

import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ButtonLoginSmall } from '@src/components/Forms/Buttons';

import {
  BACKGROUND_DARK,
  BUTTON_COLOR,
  FONT_HEADLINE_SEMIBOLD
} from '@src/styles/common';


class WelcomeTour extends Component {

  skipHandler = () => {
    this.props.navigation.navigate('LoginHandler');
  }

  render() {

    return(

      <View style={styles.homeContainer}>

        <StatusBar barStyle="light-content" />

        <Swiper loop={false}>
          <View style={styles.welcomeContent}>
            <Text style={styles.headline}>Welcome to the Future of Life Insurance</Text>
            <Image
              source={require('@assets/images/lfi-balance.png')}
              style={styles.tourImage}
              resizeMode="contain"
            />
          <Text style={styles.text}>We remove all the overhead of traditional insurance: multi-million dollar CEO salaries, fancy offices, thousands of employees.</Text>
          </View>
          <View style={styles.welcomeContent}>
            <Text style={styles.headline}>Everyone is welcome. No Restrictions.</Text>
              <Image
                source={require('@assets/images/lfi-for-everyone.png')}
                style={styles.tourImage}
                resizeMode="contain"
              />
            <Text style={styles.text}>We accept everyone, without lifestyle, age or health restrictions. Just register, purchase LFI Coin and you're all set!</Text>
          </View>
          <View style={styles.welcomeContent}>
            <Text style={styles.headline}>LFI Coins gain value over time.</Text>
              <Image
                source={require('@assets/images/lfi-calendar.png')}
                style={styles.tourImage}
                resizeMode="contain"
              />
            <Text style={styles.text}>Your LFI balance automatically doubles every 5 years. As market demand grows, so does the value of your LFI Coins.</Text>
          </View>
          <View style={styles.welcomeContent}>
            <Text style={styles.headline}>Peace of mind for your loved ones.</Text>
              <Image
                source={require('@assets/images/lfi-man-smiling.png')}
                style={styles.tourImage}
                resizeMode="contain"
              />
            <Text style={styles.text}>Upon passing, your LFI balance multiplies and can be widthdrawn. {'\n'}{'\n'}</Text>

            <ButtonLoginSmall
              onPressHandler={this.skipHandler}
              buttonLabel="Get Started"
            />

          </View>
        </Swiper>
        <View style={styles.skipTour}>
          <TouchableOpacity
            onPress={this.skipHandler}>
          <Text style={styles.textSM}>Skip Tour</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }

}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK
  },
  skipTour: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  headline: {
    fontFamily: FONT_HEADLINE_SEMIBOLD,
    fontSize: 24,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'OpenSansRegular',
    fontSize: 18,
    color: 'rgba(255,255,255,1)',

  },
  textSM: {
    fontFamily: 'OpenSansRegular',
    fontSize: 16,
    color: 'rgba(255,255,255,1)',

  },
  tourImage: {
    height: 200,
    marginVertical: 25,
  }
})

export default WelcomeTour
