import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { DrawerActions, NavigationActions } from 'react-navigation';
import UserProfile from '@src/components/User/Profile';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUserWelcome } from '@src/queries/GetUser'
import data from '@src/data';

class SideMenu extends Component {

  state: {
    name: '',
    country: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: "",
      country: ""
    };
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  logoutHandler = () => {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    AsyncStorage.clear();
    this.props.navigation.navigate('LoginHandler')
  }

  drawerHandler = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  async componentWillMount() {

    const userInfo = await API.graphql(graphqlOperation(GetUserWelcome, { userId: data.id }))
    console.log(userInfo)

    const {
      name,
      country
    } = userInfo.data.getUser;

    let userObj = {
      name: name,
      country: country
    }

    this.setState({
      isLoading: false,
      name: userObj.name,
      country: userObj.country
    })

    AsyncStorage.setItem('user', JSON.stringify(userObj))
    console.log(userObj)

  }

  async componentDidMount() {
    try {
        let userJSON = await AsyncStorage.getItem('user')
        let userData = JSON.parse(userJSON)
        this.setState({
          isLoading: false,
          name: userData.name,
          country: userData.country
        })
      } catch(error) {
        console.log(error)
    }

  }

  render() {

    const { name, country } = this.state;

    return(

        <View style={styles.menuContainer}>

          <View style={styles.sideNavTop}>
            <Image
              source={require('@assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={this.drawerHandler}
            >
              <Image
                source={require('@assets/images/icon-menu.png')}
                style={styles.iconMenu}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <UserProfile
              color="white"
              nameWeight="bold"
              photo={require('@assets/images/profile.png')}
              name={name}
              location={country}
          />

          <View style={styles.navContent}>
            <TouchableOpacity
              onPress={this.navigateToScreen('Home')}
              style={styles.navRow}
            >
              <Image
                source={require('@assets/images/icon-wallet.png')}
                style={styles.iconNav}
                resizeMode="contain"
              />
              <Text style={styles.navItem}>My Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.navigateToScreen('BuyCoin')}
              style={styles.navRow}
            >
              <Image
                source={require('@assets/images/icon-coins.png')}
                style={styles.iconNav}
                resizeMode="contain"
              />
              <Text style={styles.navItem}>Buy LFI Coin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.navigateToScreen('Certificate')}
              style={styles.navRow}
            >
              <Image
                source={require('@assets/images/icon-certificate.png')}
                style={styles.iconNav}
                resizeMode="contain"
              />
              <Text style={styles.navItem}>View Certificate</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navFooter}>
            <TouchableOpacity
              onPress={this.logoutHandler}
            >
              <Text style={styles.navItemSmall}>Logout</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1E4072',
    padding: 20,
  },
  sideNavTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 0.5,
  },
  logo: {
    width: 100,
    height: 15,
  },
  iconMenu: {
    height: 20,
    width: 20,
  },
  iconNav: {
    height: 16,
    width: 16,
    marginRight: 10,
    opacity: 0.8,
  },
  navContent: {
    flex: 1,
    width: '100%',
    paddingVertical: 20,
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: 0.5,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    fontFamily: 'MontserratSemiBold',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    paddingVertical: 10,
  },
  navItemSmall: {
    fontFamily: 'MontserratRegular',
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
    paddingVertical: 10,
  },
  navFooter: {
    paddingLeft: 10,
    alignSelf: 'flex-start',
  },
});

export default SideMenu;
