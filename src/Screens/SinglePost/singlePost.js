import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Styles, color} from '../style';
import config from '../../Config/config';
import Icon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import {ScrollView} from 'react-native-gesture-handler';
import SinglePostBase from './SinglePostBase';

class SinglePost extends SinglePostBase {
  render() {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon name="back" size={40} color="black" />
        </TouchableOpacity>
        <View style={[Styles.parent, {backgroundColor: color.lightYellow}]}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fffff',
                width: Dimensions.get('window').width,
              }}>
              <Icon
                name="user"
                size={40}
                color="black"
                style={{marginLeft: 10, marginBottom: 10}}
              />
              <Text
                style={[Styles.timelineText, {marginTop: 15, fontSize: 15}]}>
                {this.state.currentPost.email}
              </Text>

              <Text
                style={[
                  Styles.timelineText,
                  {
                    position: 'absolute',
                    right: 0,
                    marginRight: 20,
                    marginTop: 15,
                    fontSize: 15,
                  },
                ]}>
                Category:
                {this.state.currentPost.cat}
              </Text>
            </View>
            <Image
              source={{
                uri: `${config.serverURL}/${this.state.currentPost.imageupload}`,
              }}
              style={Styles.timelineImageStyle}
            />
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  this.handleLike(
                    this.state.currentPost._id,
                    this.state.currentPost.likes,
                  )
                }
                style={Styles.imageButtonStyle}>
                <Text style={Styles.imageButtonText}>
                  {this.state.like.length}
                  Like
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                style={Styles.imageButtonStyle}>
                <Text style={Styles.imageButtonText}>
                  {this.state.commentData.length}
                  Comment
                </Text>
              </TouchableOpacity>
            </View>

            {this.state.commentData.length > 0 &&
              this.state.commentData.map(comm => {
                return (
                  <View>
                    <View style={{marginTop: 10}}>
                      <Text style={{fontWeight: 'bold'}}>
                        {this.props.state.userInfo.firstname}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginBottom: 20,
                        backgroundColor: 'white',
                        marginHorizontal: 10,
                        width: Dimensions.get('window').width - 20,
                        paddingVertical: 10,
                        borderWidth: 2,
                        borderColor: 'black',
                      }}>
                      <Text style={{marginHorizontal: 10}}>{comm}</Text>
                    </View>
                  </View>
                );
              })}

            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                marginHorizontal: 20,
                borderBottomColor: 'black',
                borderRadius: 10,
                borderWidth: 2,
              }}>
              <TextInput
                value={this.state.comment}
                onChangeText={text => {
                  this.handleChange(text);
                }}
                placeholder="Enter your comment"
                onSubmitEditing={this.uploadComment}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.uploadComment}
              style={{
                backgroundColor: 'blue',
                marginHorizontal: 120,
                paddingVertical: 5,
                marginBottom: 10,
              }}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Upload Comment
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </>
    );
  }
}

let mapStateToProps = state => {
  return {state};
};

export default connect(mapStateToProps)(SinglePost);
