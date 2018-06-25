import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { Component } from 'react';
import Navigator from './src/navigators';

// View MessageQueue (Performance Checks)
// import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue'
// MessageQueue.spy(true);

// Auth
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

class App extends Component {

  state = {
    fontLoaded: false,
    isAuthenticated: false
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      MontserratRegular: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
      MontserratSemiBold: require('./assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
      MontserratBold: require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      OpenSansRegular: require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      OpenSansBold: require('./assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
      Abel: require('./assets/fonts/Abel/Abel-Regular.ttf')
    });

    this.setState({
      fontLoaded: true
    });

  }

  render() {
    return this.state.fontLoaded ? (
      <Navigator
      />
    ) : null ;
  }

}

export default App;
