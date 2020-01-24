import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Register from './Register/register';
import Login from './Login/login';
import ForgotPassword from './ForgotPassword/forgotPassword';
import ResetPassword from './ResetPassword/resetPassword';
const AppComponent = createStackNavigator(
  {
    Register: Register,
    Login: Login,
    ForgotPassword: ForgotPassword,
    ResetPassword: ResetPassword,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(AppComponent);
