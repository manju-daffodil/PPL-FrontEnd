import React, {Component} from 'react';
import {View, Text, TextInput, ImageBackground} from 'react-native';
import {Styles, color, centerText} from '../style';
import RegisterBase from './registerBase';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import UserIcon from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/Entypo';
import PasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FirstnameIcon from 'react-native-vector-icons/Entypo';
import LastnameIcon from 'react-native-vector-icons/Entypo';
import {getImage} from '../../Utilities/customComponent';
export default class Register extends RegisterBase {
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={getImage('backgroundImage')}
          style={[Styles.backgroundImage]}>
          <View style={[Styles.parent]}>
            <Text style={Styles.text}>Register Form</Text>
            <View style={[Styles.child, {alignItems: 'center'}]}>
              <UserIcon
                style={Styles.image}
                name="user"
                size={20}
                color="black"
              />
              <TextInput
                style={Styles.textInput}
                placeholder="Username"
                onChangeText={text => this.handleSubmit('username', text)}
                onSubmitEditing={() => this.password.focus()}
                required
              />
            </View>
            <Text style={Styles.error}>{this.state.usernameError}</Text>
            <View style={[Styles.child, {alignItems: 'center'}]}>
              <PasswordIcon
                style={Styles.image}
                name="onepassword"
                size={20}
                color="#9ABBA"
              />
              <TextInput
                style={Styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                ref={ref => (this.password = ref)}
                onChangeText={text => this.handleSubmit('password', text)}
                onSubmitEditing={() => this.email.focus()}
              />
            </View>
            <Text style={Styles.error}>{this.state.passwordError}</Text>
            <View style={[Styles.child, {alignItems: 'center'}]}>
              <EmailIcon
                style={Styles.image}
                name="email"
                size={20}
                color="red"
              />
              <TextInput
                style={Styles.textInput}
                placeholder="Email"
                onChangeText={text => this.handleSubmit('email', text)}
                ref={ref => (this.email = ref)}
                onSubmitEditing={() => this.firstname.focus()}
              />
            </View>
            <Text style={Styles.error}>{this.state.emailError}</Text>
            <View style={[Styles.child, {alignItems: 'center'}]}>
              <FirstnameIcon
                style={Styles.image}
                name="user"
                size={20}
                color="black"
              />
              <TextInput
                style={Styles.textInput}
                placeholder="Firstname"
                onChangeText={text => this.handleSubmit('firstname', text)}
                ref={ref => (this.firstname = ref)}
                onSubmitEditing={() => this.lastname.focus()}
              />
            </View>
            <Text style={Styles.error}>{this.state.firstnameError}</Text>
            <View style={[Styles.child, {alignItems: 'center'}]}>
              <LastnameIcon
                style={Styles.image}
                name="user"
                size={20}
                color="black"
              />
              <TextInput
                style={Styles.textInput}
                placeholder="Lastname"
                onChangeText={text => this.handleSubmit('lastname', text)}
                ref={ref => (this.lastname = ref)}
                onSubmitEditing={this.handlePress}
              />
            </View>
            <Text style={Styles.error}>{this.state.lastnameError}</Text>

            <Text style={Styles.error}>{this.state.errMessage}</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.handlePress}
              style={[
                Styles.child,
                {
                  marginHorizontal: 120,
                  paddingVertical: 10,
                  backgroundColor: color.blue,
                },

                centerText,
              ]}>
              <Text>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                Styles.child,
                {
                  backgroundColor: color.yellow,
                  paddingVertical: 10,
                  marginHorizontal: 80,
                  marginTop: 20,
                },
                centerText,
              ]}
              onPress={this.login}>
              <Text style={{textAlign: 'center', fontsize: 10}}>
                Already have an Account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
