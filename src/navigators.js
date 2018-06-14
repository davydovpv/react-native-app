import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  navigationOptions
} from "react-navigation";
import { Animated, Easing } from 'react-native';

import LoginScreen from "./screens/LoginScreen";
import SideMenu from "./components/ui/SideMenu";
import HomeScreen from "./screens/HomeScreen";
import CertificateScreen from "./screens/CertificateScreen";


// LFI Wallet / Buy Flow
import ScreensBuyBTC from "./screens/Buy/BTC";
import ScreensBuyETH from "./screens/Buy/ETH";
import ScreensBuyACH from "./screens/Buy/ACH";
import ScreensBuyConfirm from "./screens/Buy/Confirm";

// Create New Account (Cognito) / ID Flow
import ScreensRegisterAccount from "./screens/Register/Account";
import ScreensRegisterConfirmID from "./screens/Register/ConfirmID";
import ScreensRegisterVerifyID from "./screens/Register/VerifyID";
import ScreensRegisterSuccess from "./screens/Register/Success";
import ScreensRegisterFail from "./screens/Register/Fail";
import ScreensRegisterSetup from "./screens/Register/Setup";


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
    BuyCoinBTC: { screen: ScreensBuyBTC },
    BuyCoinETH: { screen: ScreensBuyETH },
    BuyCoinACH: { screen: ScreensBuyACH },
    BuyConfirm: { screen: ScreensBuyConfirm }
  },
  buyCoinStackConfig
);

const RegisterStack = createStackNavigator(
  {
    Register_0: { screen: ScreensRegisterAccount },
    Register_1: { screen: ScreensRegisterConfirmID },
    Register_2: { screen: ScreensRegisterVerifyID },
    Register_3: { screen: ScreensRegisterSuccess },
    Register_Fail: { screen: ScreensRegisterFail },
    WelcomeFund: { screen: ScreensRegisterSetup }
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
