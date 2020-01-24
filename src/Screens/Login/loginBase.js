import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { callApi } from '../../Utilities/utility';
import Store from '../../Redux/store';
import { setUserInfo, setToken } from '../../Redux/actions';
import {
  checkField,
  isValidEmail,
  isValidPassword,
} from '../../Utilities/validation';
export default class LoginBase extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      errMessage: '',
    };
  }

  checkAllManditoryFields = () => {
    var Email = isValidEmail(this.state.email.trim());
    var Password = isValidPassword(this.state.password.trim());
    if (Email === false) Email = 'Enter correct email format';
    this.setState({ emailError: Email, passwordError: Password });
    if (Email === true && Password === true) return true;
    return false;
  };

  handleChange = (key, text) => {
    this.setState({ [key]: text });
    let valid = checkField(key, text.trim());
    this.setState({ [`${key}Error`]: valid });
  };

  handleClick = () => {
    if (this.checkAllManditoryFields()) {
      callApi('post', 'login', this.state)
        .then(response => {
          console.warn('response--', response);
          if (response.data.length > 0) {
            if (!response.data[0].verify) {
              this.setState({ errMessage: 'Verify your email first' });
            } else {
              console.warn('res>>>', response.data);
              let userData = {
                _id: response.data[0]._id,
                firstname: response.data[0].firstname,
                email: response.data[1].payload.user,
                lastname: response.data[0].lastname,
                profilePicture: response.data[0].profilePicture
              };
              let token = {
                tokenId: response.data[1].token,
                _id: userData._id
              };

              AsyncStorage.setItem('tokenID', JSON.stringify(token));
              AsyncStorage.setItem('userInfo', JSON.stringify(userData._id));

              Store.dispatch(setUserInfo(userData));
              Store.dispatch(setToken(token));
              this.props.navigation.navigate('Timeline');
            }
          } else if (response.status === 204) {
            this.setState({ errMessage: 'Invalid Username Or Password' });
          }
          //  else {
          //   this.setState({errMessage: 'Db is not connected'});
          // }
        })
        .catch(err => {
          console.log('myError---', err);
          if (err.message === 'Network Error') {
            this.setState({ errMessage: 'Something went wrong' });
          }
        });
    } else {
      console.warn('error');
    }
  };

  Register = () => {
    this.props.navigation.navigate('Register');
  };
  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };
}
