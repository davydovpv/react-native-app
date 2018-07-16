import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  navigationOptions
} from 'react-navigation';
import { Animated, Easing } from 'react-native';

import ScreensLogin from './screens/Login';
import ScreensHome from './screens/Home';
import ScreensCertificate from './screens/Certificate';

// Create New Account (Cognito)
import ScreensRegisterAccount from './screens/Register/Account';
import ScreensRegisterVerify from './screens/Register/Verify';
import ScreensRegisterSuccess from './screens/Register/Success';

// Welcome Flow + Onboarding
import ScreensWelcome from './screens/Welcome/';
import WelcomeTour from './screens/Welcome/Tour';

// Setup: Verify ID Flow
import ScreensVerifyIDStart from './screens/Setup/VerifyID/Start';
import ScreensVerifyIDProcess from './screens/Setup/VerifyID/Process';
import ScreensVerifyIDSuccess from './screens/Setup/VerifyID/Success';
import ScreensVerifyIDFail from './screens/Setup/VerifyID/Fail';

// Setup: LFI Wallet
import ScreensSetupWallet from './screens/Setup/Wallet/';

// Buy Flow
import ScreensBuyBTC from './screens/Buy/BTC';
import ScreensBuyETH from './screens/Buy/ETH';
import ScreensBuyACH from './screens/Buy/ACH';
import ScreensBuyConfirm from './screens/Buy/Confirm';

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

const RegisterStack = createStackNavigator(
  {
    NewAccount: { screen: ScreensRegisterAccount },
    VerifyAccount: { screen: ScreensRegisterVerify },
    Success: { screen: ScreensRegisterSuccess },
  },
  globalStackConfig
);

const WelcomeStack = createStackNavigator(
  {
    Welcome: { screen: ScreensWelcome },
    VerifyID: { screen: ScreensVerifyIDStart },
    Process: { screen: ScreensVerifyIDProcess },
    Success: { screen: ScreensVerifyIDSuccess },
    Fail: { screen: ScreensVerifyIDFail },
    SetupWallet: { screen: ScreensSetupWallet }
  },
  globalStackConfig
);

const BuyCoinStack = createStackNavigator(
  {
    BuyCoinETH: { screen: ScreensBuyETH },
    BuyCoinBTC: { screen: ScreensBuyBTC },
    BuyCoinACH: { screen: ScreensBuyACH },
    BuyConfirm: { screen: ScreensBuyConfirm }
  },
  buyCoinStackConfig
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
    Register: RegisterStack,
    Welcome: WelcomeStack,
    Home: DrawerNav,
    Onboard: WelcomeTour,
  },
  {
    initialRouteName: 'Onboard',
    headerMode: 'none'
  }
);

export default LoginStack;
