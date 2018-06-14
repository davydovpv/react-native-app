import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  navigationOptions
} from 'react-navigation';
import { Animated, Easing } from 'react-native';

import ScreensLogin from './screens/LoginScreen';
import ScreensHome from './screens/HomeScreen';
import ScreensCertificate from './screens/CertificateScreen';

// LFI Wallet / Buy Flow
import ScreensBuyBTC from './screens/Buy/BTC';
import ScreensBuyETH from './screens/Buy/ETH';
import ScreensBuyACH from './screens/Buy/ACH';
import ScreensBuyConfirm from './screens/Buy/Confirm';

// Create New Account (Cognito) / ID Flow
import ScreensRegisterAccount from './screens/Register/Account';
import ScreensRegisterConfirmID from './screens/Register/ConfirmID';
import ScreensRegisterVerifyID from './screens/Register/VerifyID';
import ScreensRegisterSuccess from './screens/Register/Success';
import ScreensRegisterFail from './screens/Register/Fail';
import ScreensRegisterSetup from './screens/Register/Setup';

// Nav Content Component
import SideMenu from './components/Nav/SideMenu';

const globalStackConfig = {
  headerMode: 'none'
};

const buyCoinStackConfig = {
  headerMode: 'none',
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
    NewAccount: { screen: ScreensRegisterAccount },
    ConfirmID: { screen: ScreensRegisterConfirmID },
    VerifyID: { screen: ScreensRegisterVerifyID },
    Success: { screen: ScreensRegisterSuccess },
    Fail: { screen: ScreensRegisterFail },
    SetupWallet: { screen: ScreensRegisterSetup }
  },
  globalStackConfig
);


const DrawerNav = createDrawerNavigator(
  {
    Home: { screen: ScreensHome },
    BuyCoin: { screen: BuyCoinStack },
    Certificate: { screen: ScreensCertificate }
  },
  {
     contentComponent: SideMenu,
     drawerWidth: 275,
     navigationOptions: {
       drawerLockMode: 'locked-closed',
       lockMode: 'locked-closed',
       disableOpenGesture: 'false'
     }
   }
);

const LoginStack = createSwitchNavigator(
  {
    LoginHandler: ScreensLogin,
    Home: DrawerNav,
    Register: RegisterStack
  },
  {
    initialRouteName: 'LoginHandler',
    headerMode: 'none'
  }
);

export default LoginStack;
