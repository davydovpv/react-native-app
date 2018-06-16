import { NavigationActions } from 'react-navigation';

navigateToScreen = route => () => {

  const navigateAction = NavigationActions.navigate({
    routeName: route
  });

};

export default navigateToScreen
