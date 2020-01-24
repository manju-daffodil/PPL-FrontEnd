import React from 'react';
import {StackActions, NavigationActions} from 'react-navigation';

const routePath = (route, props) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: route})],
  });
  props.navigation.dispatch(resetAction);
};

export default routePath;
