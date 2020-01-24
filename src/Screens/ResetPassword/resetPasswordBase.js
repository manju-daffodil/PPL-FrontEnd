import React, {Component} from 'react';

import {callApi} from '../../Utilities/utility';
import {checkField, isValidPassword} from '../../Utilities/validation';
export default class ResetPasswordBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.navigation.state.params.email,
      newPassword: '',
      newPasswordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      errMessage: '',
    };
  }
  checkAllMandatoryFields() {
    let NewPassword = isValidPassword(this.state.newPassword.trim());
    let ConfirmPassword = isValidPassword(this.state.confirmPassword.trim());
    this.setState({
      newPasswordError: NewPassword,
      confirmPasswordError: ConfirmPassword,
    });
    if (NewPassword === true && ConfirmPassword === true) return true;
    return false;
  }

  handleChange = (key, text) => {
    this.setState({[key]: text});

    let valid = checkField(key, text.trim());
    this.setState({[`${key}Error`]: valid});
  };

  handlePress = () => {
    if (this.checkAllMandatoryFields()) {
      if (this.state.newPassword === this.state.confirmPassword) {
        let userDetails = {
          email: this.state.email,
          password: this.state.newPassword,
        };

        callApi('post', 'reset', userDetails)
          .then(response => {
            if (response.status === 200) {
              this.props.navigation.navigate('Login');
            }
          })
          .catch(err => {
            console.log('forgotPAsswordErr--', err);
          });
      } else {
        this.setState({errMessage: 'Password mismatched'});
      }
    }
  };
}
