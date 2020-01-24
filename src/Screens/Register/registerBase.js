import React, {Component} from 'react';

import {callApi} from '../../Utilities/utility';
import {
  checkField,
  isValidEmail,
  isValidPassword,
  isValidFirstname,
  isValidLastname,
  isValidUsername,
} from '../../Utilities/validation';
import routePath from '../customComponent';
export default class RegisterBase extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      email: '',
      emailError: '',
      firstname: '',
      firstnameError: '',
      lastname: '',
      lastnameError: '',
      errMessage: '',
    };
  }

  checkAllMandatoryFields() {
    var Username = isValidUsername(this.state.username.trim());
    var Email = isValidEmail(this.state.email.trim());
    var Password = isValidPassword(this.state.password.trim());
    var Firstname = isValidFirstname(this.state.firstname.trim());
    var Lastname = isValidLastname(this.state.lastname);
    if (Email === false) Email = 'Enter correct email format';
    this.setState({
      usernameError: Username,
      passwordError: Password,
      emailError: Email,
      firstnameError: Firstname,
      lastnameError: Lastname,
    });
    if (
      Username === true &&
      Password === true &&
      Username === true &&
      Firstname === true &&
      Lastname === true
    )
      return true;
    return false;
  }

  handleSubmit = (key, text) => {
    this.setState({[key]: text});
    let valid = checkField(key, text.trim());
    this.setState({[`${key}Error`]: valid});
  };

  handlePress = () => {
    console.warn("this.state",this.state)
    if (this.checkAllMandatoryFields()) {
      let data = this.state;
      callApi('post', 'registerUser', data)
        .then(response => {
          console.log('Response-----', response.status);
          if (response.status === 200) {
            // this.props.navigation.navigate('Login');
            routePath('Login', this.props);
          } else {
            this.setState({errMessage: 'email already registered'});
          }
        })
        .catch(err => {
          console.log('registerErr--', err);
        });
    }
  };
  login = () => {
    this.props.navigation.navigate('Login');
  };
}
