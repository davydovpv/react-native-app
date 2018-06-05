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
import VerifyIDScreen from "./screens/VerifyIDScreen";
import RegisterSuccessScreen from "./screens/RegisterSuccessScreen";
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

const RegisterStack = createStackNavigator(
  {
    Register_1: { screen: RegisterScreen },
    Register_2: { screen: VerifyIDScreen },
    Register_3: { screen: RegisterSuccessScreen }
  },
  globalStackConfig
);


const DrawerNav = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    BuyCoin: { screen: BuyCoinStack },
    Certificate: { screen: CertificateScreen }
  },
  {
     contentComponent: SideMenu,
     drawerWidth: 275,
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
    Home: DrawerNav,
    Register: RegisterStack
  },
  {
    initialRouteName: "LoginHandler",
    headerMode: "none"
  }
);

export default LoginStack;
