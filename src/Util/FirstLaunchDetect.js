import { AsyncStorage } from 'react-native';
const HAS_LAUNCHED = 'hasLaunched';

setAppLaunched = () => {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true')
}

checkIfFirstLaunch = async () => {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    hasLaunched === null ? setAppLaunched() : return false;
  } catch (err) {
    return false;
  }
}

export default checkIfFirstLaunch;
