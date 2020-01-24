import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Styles, color} from '../style';
import PasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {callApi} from '../../Utilities/utility';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {checkField, isValidPassword} from '../../Utilities/validation';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      oldPasswordError: '',
      newPassword: '',
      newPasswordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      userDetails: [],
      token: this.props.state.token.tokenId,
      query: {
        filter: {_id: this.props.state.userInfo._id},
        fields: {},
        option: {skip: 0, limit: 0, sort: {}},
      },
    };
  }

  checkAllMandatoryFields = () => {
    let OldPassword = isValidPassword(this.state.oldPassword.trim());
    let NewPassword = isValidPassword(this.state.newPassword.trim());
    let ConfirmPassword = isValidPassword(this.state.confirmPassword.trim());
    this.setState({
      oldPasswordError: OldPassword,
      newPasswordError: NewPassword,
      confirmPasswordError: ConfirmPassword,
    });
    if (
      OldPassword === true &&
      NewPassword === true &&
      ConfirmPassword === true
    )
      return true;
    return false;
  };

  componentDidMount() {
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.state.token}`,
    };

    callApi(
      'get',
      `getUserDetails?params=${JSON.stringify(this.state.query)}`,
      {},
      headers,
    )
      .then(response => {
        this.setState({userDetails: response.data});
      })
      .catch(err => {
        console.log('err-->>>', err);
      });
  }
  handleChange = (key, text) => {
    this.setState({[key]: text});
    let valid = checkField(key, text.trim());
    this.setState({[`${key}Error`]: valid});
  };

  handleSubmit = () => {
    if (this.checkAllMandatoryFields()) {
      let password = this.state.userDetails[0].password;
      if (this.state.newPassword === this.state.confirmPassword) {
        if (this.state.oldPassword === password) {
          let headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${this.state.token}`,
          };
          let userData = {
            password: this.state.newPassword,
            email: this.props.state.userInfo.email,
          };
          callApi('post', 'reset', userData, {})
            .then(response => {
              if(response.status===200){
             this.props.navigation.navigate("UserDetails")
              }
            })
            .catch(err => {
              console.log('err>>>>', err);
            });
        } else {
          this.setState({oldPasswordError: 'Incorrect Password'});
        }
      } else {
        let error = 'Password Mismatched';
        this.setState({
          newPasswordError: error,
          confirmPasswordError: error,
        });
      }
    }
  };

  render() {
    return (
      <>
        <TouchableOpacity
          style={{backgroundColor: color.navyBlue}}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrowleft" size={40} color="black" />
        </TouchableOpacity>
        <View style={[Styles.parent, {backgroundColor: color.navyBlue}]}>
          <Text style={Styles.text}>Old Password</Text>
          <View style={[Styles.child, {alignItems: 'center'}]}>
            <PasswordIcon
              style={Styles.image}
              name="onepassword"
              size={20}
              color="#9ABBA"
            />

            <TextInput
              placeholder="Enter Old Password"
              style={Styles.textInput}
              secureTextEntry={true}
              onChangeText={text => this.handleChange('oldPassword', text)}
              returnKeyType={'done'}
              onSubmitEditing={() => this.newPassword.focus()}
            />
          </View>
          <Text style={Styles.error}>{this.state.oldPasswordError}</Text>
          <Text style={Styles.text}>New Password</Text>
          <View style={[Styles.child, {alignItems: 'center'}]}>
            <PasswordIcon
              style={Styles.image}
              name="onepassword"
              size={20}
              color="#9ABBA"
            />
            <TextInput
              placeholder="Enter New Password"
              style={Styles.textInput}
              ref={ref => (this.newPassword = ref)}
              secureTextEntry={true}
              onChangeText={text => this.handleChange('newPassword', text)}
              returnKeyType={'done'}
              onSubmitEditing={() => this.confirmPassword.focus()}
            />
          </View>
          <Text style={Styles.error}>{this.state.newPasswordError}</Text>
          <Text style={Styles.text}>Confirm Password</Text>
          <View style={[Styles.child, {alignItems: 'center'}]}>
            <PasswordIcon
              style={Styles.image}
              name="onepassword"
              size={20}
              color="#9ABBA"
            />
            <TextInput
              placeholder="Confirm New Password"
              style={Styles.textInput}
              secureTextEntry={true}
              ref={ref => (this.confirmPassword = ref)}
              onChangeText={text => this.handleChange('confirmPassword', text)}
              returnKeyType={'done'}
              onSubmitEditing={this.handleClick}
            />
          </View>
          <Text style={Styles.error}>{this.state.confirmPasswordError}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.handleSubmit}
            style={{
              paddingVertical: 5,
              backgroundColor: 'blue',
              marginHorizontal: 120,
              borderRadius: 10,
            }}>
            <Text style={{textAlign: 'center'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const styles = {
  text: {
    marginLeft: 80,
    fontWeight: 'bold',
    fontSize: 10,
  },
};

const mapStateToProps = state => {
  return {state};
};
export default connect(mapStateToProps)(ChangePassword);
