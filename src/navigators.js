import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  navigationOptions
} from "react-navigation";
import { Animated, Easing } from 'react-native';

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import BuyCoinBTCScreen from "./screens/BuyCoinBTCScreen";
import BuyCoinETHScreen from "./screens/BuyCoinETHScreen";
import BuyCoinACHScreen from "./screens/BuyCoinACHScreen";
import CertificateScreen from "./screens/CertificateScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SideMenu from "./components/ui/SideMenu";

const globalStackConfig = {
  headerMode: "none"
};

const buyCoinStackConfig = {
  headerMode: "none",
  transitionConfig : () => ({
  	transitionSpec: {
  		duration: 0,
  		timing: Animated.timing,
  		easing: Easing.step0,
  	},
  }),
};

const BuyCoinStack = createStackNavigator(
  {
    BuyCoinBTC: { screen: BuyCoinBTCScreen },
    BuyCoinETH: { screen: BuyCoinETHScreen },
    BuyCoinACH: { screen: BuyCoinACHScreen },
  },
  buyCoinStackConfig
);



const DrawerNav = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    BuyCoin: { screen: BuyCoinStack },
    Certificate: { screen: CertificateScreen },
    Register: { screen: RegisterScreen },
  },
  {
     contentComponent: SideMenu,
     drawerWidth: 275,
     drawerOpenRoute: "DrawerOpen",
     drawerCloseRoute: "DrawerClose",
     drawerToggleRoute: "DrawerToggle",
     navigationOptions: {
       drawerLockMode: "locked-closed",
       lockMode: "locked-closed",
       disableOpenGesture: "false"
     }
   }
);

const LoginStack = createSwitchNavigator(
  {
    LoginHandler: LoginScreen,
    Home: DrawerNav
  },
  {
    initialRouteName: "LoginHandler",
    headerMode: "none"
  }
);

export default LoginStack;
