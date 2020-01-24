import React, {Component} from 'react';
import {Text, View, Button, Image} from 'react-native';
import {Styles, color} from './style';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {callApi} from '../Utilities/utility';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  checkField,
  isEmptyPhoto,
  isValidCategory,
  isValidPhoto,
} from '../Utilities/validation';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      photoError: '',
      category: '',
      categoryError: '',
      token: this.props.state.token.tokenId,
    };
  }

  checkAllMandatoryFields = () => {
    let Category = isValidCategory(this.state.category.trim());
    let Photo = isValidPhoto(this.state.photo);
    this.setState({categoryError: Category, photoError: Photo});
    if (Category === true && Photo === true) return true;
    return false;
  };

  handlePhoto = () => {
    let options = {noData: true};
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.warn('res===', response);
        console.warn('uri===', response.uri);
        this.setState({photo: response});
        let validPhoto = isEmptyPhoto(response);
        this.setState({photoError: validPhoto});
      }
    });
  };

  handleChange = (key, text) => {
    this.setState({[key]: text});
    let valid = checkField(key, text.trim());
    this.setState({[`${key}Error`]: valid});
  };

  handlePress = () => {
    if (this.checkAllMandatoryFields()) {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      };
      let {firstname, _id} = this.props.state.userInfo;
      let {photo} = this.state;
      let formData = new FormData();

      formData.append('userId', _id);
      formData.append('email', firstname);
      formData.append('cat', this.state.category.toUpperCase());
      formData.append('imageupload', {
        uri: this.state.photo.uri,
        type: 'image/jpeg',
        name: this.state.photo.fileName,
        size: this.state.photo.fileSize,
      });

      callApi('post', 'timeline/imageUpload', formData, headers)
        .then(response => {
          this.props.navigation.navigate('Timeline');
        })
        .catch(err => {
          console.log('error--', err);
        });
    } else {
      console.warn('Errorrr');
    }
  };
  handleDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    let {photo} = this.state;
    return (
      <>
        <TouchableOpacity onPress={this.handleDrawer}>
          <Icon name="bars" size={40} color="black" />
        </TouchableOpacity>
        <View style={[Styles.parent, {backgroundColor: color.navyBlue}]}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {photo && (
              <Image
                style={{width: 200, height: 200}}
                source={{uri: photo.uri}}
              />
            )}
            <Button title="choose photo" onPress={this.handlePhoto} />
          </View>
          <Text style={Styles.error}>{this.state.photoError}</Text>
          <View
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              marginHorizontal: 100,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Category"
              onChangeText={text => this.handleChange('category', text)}
            />
          </View>
          <Text style={Styles.error}>{this.state.categoryError}</Text>
          <TouchableOpacity
            onPress={this.handlePress}
            style={{
              marginTop: 10,
              backgroundColor: 'blue',
              marginHorizontal: 150,
              paddingVertical: 5,
            }}>
            <Text style={Styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
let mapStateToProps = state => {
  return {state};
};
export default connect(mapStateToProps)(ImageUpload);
