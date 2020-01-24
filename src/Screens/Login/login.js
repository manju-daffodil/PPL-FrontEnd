import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {Styles, color, centerText} from '../style';

import LoginBase from './loginBase';
import EmailIcon from 'react-native-vector-icons/Entypo';
import PasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getImage} from '../../Utilities/customComponent';

class Login extends LoginBase {
  render() {
    return (
      <ImageBackground
        source={getImage('backgroundImage')}
        style={Styles.backgroundImage}>
        <View style={Styles.parent}>
          <Text style={Styles.text}>Login Form</Text>
          <View style={[Styles.child, {alignItems: 'center'}]}>
            <EmailIcon
              style={Styles.image}
              name="email"
              size={20}
              color="red"
            />
            <TextInput
              placeholder="Enter Your Email"
              style={Styles.textInput}
              onChangeText={text => this.handleChange('email', text)}
              onSubmitEditing={() => this.password.focus()}
              returnKeyType={'next'}
            />
          </View>
          <Text style={Styles.error}>{this.state.emailError}</Text>

          <View style={[Styles.child, {alignItems: 'center'}]}>
            <PasswordIcon
              style={Styles.image}
              name="onepassword"
              size={20}
              color="#9ABBA"
            />
            <TextInput
              placeholder="Enter Your Password"
              style={Styles.textInput}
              secureTextEntry={true}
              ref={ref => (this.password = ref)}
              onChangeText={text => this.handleChange('password', text)}
              returnKeyType={'done'}
              onSubmitEditing={this.handleClick}
            />
          </View>
          <Text style={Styles.error}>{this.state.passwordError}</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              Styles.child,
              {
                marginHorizontal: 120,
                backgroundColor: color.blue,
                paddingVertical: 10,
              },
              centerText,
            ]}
            onPress={this.handleClick}>
            <Text style={Styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={Styles.error}>{this.state.errMessage}</Text>

          <TouchableOpacity
            style={[
              Styles.child,
              {backgroundColor: color.navyBlue, paddingVertical: 10},
              centerText,
            ]}
            onPress={this.forgotPassword}>
            <Text style={Styles.buttonText}>Forgot password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Styles.child,
              {backgroundColor: color.navyBlue, paddingVertical: 10},
              centerText,
            ]}
            onPress={this.Register}>
            <Text style={Styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  return {state};
};
export default connect(mapStateToProps)(Login);
