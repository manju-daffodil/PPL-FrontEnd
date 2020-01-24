import React, { Component } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { Styles, color } from '../style';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker'
import { callApi } from '../../Utilities/utility';
import Store from '../../Redux/store'
import { setUserInfo } from '../../Redux/actions';
class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.state.userInfo.firstname,
      lastname: this.props.state.userInfo.lastname,
      email: this.props.state.userInfo.email,
      _id: this.props.state.userInfo._id,
      photo: null
    };
  }
  handleChangeText = (key, val) => {
    this.setState({
      [key]: val,
    });
  };

  handleSubmit = () => {
    let { tokenId } = this.props.state.token;
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenId}`,
    };

    let formData = new FormData();
    formData.append("_id", this.state._id);
    formData.append("firstname", this.state.firstname);
    formData.append("lastname", this.state.lastname);
    formData.append("profilePicture", {
      uri: this.state.photo.uri,
      type: 'image/jpeg',
      name: this.state.photo.fileName,
      size: this.state.photo.fileSize,
    })

    callApi('post', 'updateUserDetails', formData, headers)
      .then(response => {


        if (response.status === 200) {
          let userData = {
            _id: response.data[0]._id,
            firstname: response.data[0].firstname,
            email: response.data[0].email,
            lastname: response.data[0].lastname,
            profilePicture: response.data[0].profilePicture
          };
          Store.dispatch(setUserInfo(userData));
          this.props.navigation.navigate("Timeline")
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePhoto = () => {
    let option = { noData: true }
    ImagePicker.launchImageLibrary(option, response => {
      console.warn(response.uri);
      this.setState({ photo: response })
    })

  }

  render() {
    let { photo } = this.state;
    return (
      <View style={[Styles.parent, { backgroundColor: color.navyBlue }]}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Icon name="bars" size={40} color="black" />
        </TouchableOpacity>
        <ScrollView>

          <Text style={Styles.text}>User Details</Text>
          <View style={styles.userDetailsParent}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Firstname
            </Text>
            <TextInput
              value={this.state.firstname}
              onChangeText={text => this.handleChangeText('firstname', text)}
              style={{ fontSize: 15, marginTop: 10 }}
            />
          </View>
          <View style={styles.userDetailsParent}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Lastname
            </Text>
            <TextInput
              value={this.state.lastname}
              onChangeText={text => this.handleChangeText('lastname', text)}
              style={{ fontSize: 15, marginTop: 10 }}
            />
          </View>
          <View style={styles.userDetailsParent}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 10 }}>
              Email
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10, paddingBottom: 10 }}>
              {' '}
              {this.state.email}
            </Text>
          </View>
          <TouchableOpacity style={{
            marginTop: 20,
            backgroundColor: color.blue,
            marginHorizontal: 80,
            paddingVertical: 5,
            marginLeft: 80,
            borderColor: 'black',
            borderWidth: 2,
            flexDirection: "row"

          }} onPress={this.handlePhoto}>
            <Text style={{ fontWeight: 'bold', marginLeft: 40 }}>Change Profile Picture</Text>
            <View>{photo && <Image source={{ uri: photo.uri }} style={{ widt: 50, height: 100 }} />}</View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ChangePassword');
            }}
            style={{
              marginTop: 20,
              backgroundColor: color.blue,
              marginHorizontal: 80,
              paddingVertical: 5,
              marginLeft: 80,
              borderColor: 'black',
              borderWidth: 2

            }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              ChangePassword
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleSubmit}
            style={{
              marginTop: 20,
              backgroundColor: color.blue,
              marginHorizontal: 80,
              paddingVertical: 5,
              borderColor: 'black',
              borderWidth: 2

            }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

let mapStateToProps = state => {
  return { state };
};

const styles = {
  userDetailsParent: {
    marginLeft: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: 'grey',
  },
};
export default connect(mapStateToProps)(UserDetails);
