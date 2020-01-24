import React, {Component} from 'react';

import {callApi} from '../../Utilities/utility';
import {checkField, isValidEmail} from '../../Utilities/validation';
export default class ForgotPasswordBase extends Component {
  constructor() {
    super();
    this.state = {email: '', emailError: '', errMessage: ''};
  }

  checkAllMandatoryFields() {
    let Email = isValidEmail(this.state.email);
    if (Email === false) Email = 'Enter correct email format';
    this.setState({emailError: Email});
    if (Email === true) return true;
    return false;
  }

  handleChange = (key, text) => {
    this.setState({[key]: text});
    let valid = checkField(key, text.trim());
    this.setState({emailError: valid});
  };
  handlePress = () => {
    if (this.checkAllMandatoryFields()) {
      let emailData = {email: this.state.email};
      callApi('post', 'forgot', emailData)
        .then(response => {
          if (response.data.length > 0) {
            this.props.navigation.navigate('ResetPassword', {
              email: this.state.email,
            });
          } else {
            this.setState({errMessage: 'email not registered'});
          }
        })
        .catch(err => {
          console.warn('forgotPAsswordErr--', err);
        });
    }
  };
}
