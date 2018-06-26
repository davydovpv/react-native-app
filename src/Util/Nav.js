import { NavigationActions } from 'react-navigation';

const NavigateToScreen = route => {
  const navigateAction = NavigationActions.navigate({
    routeName: route
  });
};

export { NavigateToScreen }
