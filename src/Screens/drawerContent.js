import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeIcon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { Styles, color } from './style';
import routhPath from './customComponent';
import { callApi } from '../Utilities/utility';
import config from '../Config/config'

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.state.userInfo.firstname,
      _id: this.props.state.userInfo._id,
      profileImage: this.props.state.userInfo.profilePicture
    };
  }
  // componentDidMount() {
  //   let { tokenId } = this.props.state.token;
  //   let headers = {
  //     Accept: "application/json",
  //     Authorization: `Bearer ${tokenId}`
  //   }
  //   let data = { _id: this.state._id }
  //   console.warn("id>>>", data)
  //   callApi("get", `getUserDetails?params=${JSON.stringify(data)}`, {}, headers).then(response => {
  //     // console.warn("response>>>", response.data)
  //     this.setState({ profileImage: response.data[0].profilePicture })
  //   })
  // }
  render() {
    console.warn("Image>>>>", this.state.profileImage)
    return (
      <View style={[Styles.DrawerContent]}>

        <View

          style={{
            backgroundColor: '#0095ff',
            paddingVertical: 30,
            borderBottomColor: 'grey',
            borderBottomWidth: 0.5,
            alignItems: "center"
          }}>
          <View style={{ height: 70, width: 70, borderColor: "black", borderWidth: 5, borderRadius: 40 }}>
            {this.state.profileImage &&
              <Image source={{ uri: `${config.serverURL}/${this.state.profileImage}` }} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
            }</View>
          <Text>{this.state.firstname}</Text>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
            this.props.navigation.navigate('UserDetails');
          }}>
            <Icon name="edit" size={20} color="black" />
            <Text>Edit Profile</Text>
          </TouchableOpacity>
        </View>




        <TouchableOpacity
          onPress={() => routhPath('Timeline', this.props)}
          activeOpacity={0.7}
          style={Styles.drawerContentStyles}>
          <HomeIcon name="home" size={20} color="black" />
          <Text
            style={{ marginLeft: 20, textAlign: 'center', fontWeight: 'bold' }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => routhPath('Profile', this.props)}
          activeOpacity={0.7}
          style={Styles.drawerContentStyles}>
          <Icon name="solution1" size={20} color="black" />
          <Text
            style={{ marginLeft: 20, textAlign: 'center', fontWeight: 'bold' }}>
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => routhPath('ImageUpload', this.props)}
          activeOpacity={0.7}
          style={Styles.drawerContentStyles}>
          <Icon name="camera" size={20} color="black" />
          <Text
            style={{ marginLeft: 20, textAlign: 'center', fontWeight: 'bold' }}>
            Upload Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => routhPath('Logout', this.props)}
          activeOpacity={0.7}
          style={Styles.drawerContentStyles}>
          <Icon name="logout" size={20} color="black" />
          <View>
            <Text
              style={{
                marginLeft: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

let mapStateToProps = state => {
  return { state };

};

export default connect(mapStateToProps)(DrawerContent);
