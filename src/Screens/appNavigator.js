import React from 'react';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import MainStack from './mainStack';
import AppComponent from './appComponent';
import AppAuthenticate from './AuthComponent/appAuthenticate';

const switchNavigator = createSwitchNavigator(
  {
    AppAuthenticate: AppAuthenticate,
    MainStack: MainStack,
    AppComponent: AppComponent,
    // Drawer: drawerNavigator,
  },
  {
    initialRouteName: 'AppAuthenticate',
  },
);
export default createAppContainer(switchNavigator);
