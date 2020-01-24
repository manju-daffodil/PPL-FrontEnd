import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {Styles} from './style';
import Store from '../Redux/store';
import {LogoutUser} from '../Redux/actions';
class Logout extends Component {
  constructor() {
    super();
    this.state = {logoutData: ''};
  }
  handleDrawers = () => {
    this.props.navigation.openDrawer();
  };
  logout = () => {
    let keys = ["tokenID","userInfo"]
    AsyncStorage.multiRemove(keys);
    Store.dispatch(LogoutUser());

    this.props.navigation.navigate('AppComponent');
  };
  render() {
    return (
      <ImageBackground
        source={require('./images/nature1.jpeg')}
        style={Styles.backgroundImage}>
        <View>
          <TouchableOpacity onPress={this.handleDrawers}>
            <Icon name="bars" size={40} color="#900" />
          </TouchableOpacity>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>Are you sure You want to Logout?</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.logout}
            style={{
              marginHorizontal: 150,
              backgroundColor: 'blue',
              paddingVertical: 10,
              fontWeifht: 'bold',
              alignItems: 'center',
              borderWidth: 5,
              borderColor: 'black',
            }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
export default Logout;
