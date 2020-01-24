import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Button,
  Image,
  TextInput,
} from 'react-native';
import {Styles, color, centerText} from '../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetPasswordBase from './resetPasswordBase';

import PasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ResetPassword extends ResetPasswordBase {
  render() {
    return (
      <ImageBackground
        source={require('../images/nature.jpeg')}
        style={{width: null, height: null, flex: 1, opacity: 0.7}}>
        <View style={Styles.parent}>
          <Text style={[Styles.text, {textAlign: 'center'}]}>
            Reset Password
          </Text>
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
              onChangeText={text => this.handleChange('newPassword', text)}
              returnKeyType={'done'}
              onSubmitEditing={this.handleClick}
            />
          </View>
          <Text style={Styles.error}>{this.state.newPasswordError}</Text>

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
              onChangeText={text => this.handleChange('confirmPassword', text)}
              returnKeyType={'done'}
              onSubmitEditing={this.handleClick}
            />
          </View>
          <Text style={Styles.error}>{this.state.confirmPasswordError}</Text>

          <Text style={Styles.error}>{this.state.errMessage}</Text>

          <TouchableOpacity
            onPress={this.handlePress}
            activeOpacity={0.7}
            style={[
              Styles.child,
              {
                backgroundColor: color.yellow,
                paddingVertical: 10,
                marginHorizontal: 80,
                marginTop: 20,
              },
              centerText,
            ]}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
