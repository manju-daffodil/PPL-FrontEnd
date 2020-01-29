import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import UserIcon from "react-native-vector-icons/Entypo";
import moment from "moment";
import { connect } from "react-redux";
import { Styles, color } from "../style";
import config from "../../Config/config";
import ProfileBase from "./profileBase";

class Profile extends ProfileBase {
  render() {
    let {
      firstname,
      lastname,
      email,
      profilePicture
    } = this.props.state.userInfo;
    return (
      <View style={Styles.parent}>
        <TouchableOpacity onPress={this.handlePress}>
          <Icon name="bars" size={40} color="black" />
        </TouchableOpacity>
        <Text style={Styles.text}>Welcome to your Profile {firstname}</Text>
        <View
          style={{
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderColor: "black"
          }}
        >
          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                height: 70,
                width: 70,
                borderColor: "black",
                borderWidth: 5,
                borderRadius: 40,
                marginTop: 5
              }}
            >
              <Image
                source={{ uri: `${config.serverURL}/${profilePicture}` }}
                style={{ width: "100%", height: "100%", borderRadius: 40 }}
              />
            </View>

            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Firstname:</Text>
              <Text>
                {"  "}
                {firstname}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Lastname:</Text>
              <Text>
                {"  "}
                {lastname}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Email:</Text>
              <Text>
                {"  "}
                {email}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          {this.state.AllPosts.length > 0 &&
            this.state.AllPosts.map(post => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.handleClick(post._id)}
                  style={{
                    marginBottom: 20,
                    backgroundColor: color.navyBlue
                  }}
                >
                  <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Image
                      source={{
                        uri: `${config.serverURL}/${post.userId.profilePicture}`
                      }}
                      style={{ width: 30, height: 30, borderRadius: 40 }}
                    />
                    <Text
                      style={[
                        Styles.timelineText,
                        { marginTop: 5, fontSize: 15 }
                      ]}
                    >
                      {post.email}
                    </Text>
                    <Text
                      style={{ position: "absolute", right: 5, fontSize: 10 }}
                    >
                      {moment(post.uploadTime).format("MMMM Do YYYY h:mm:ss")}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: `${config.serverURL}/${post.imageupload}`
                    }}
                    style={[Styles.timelineImageStyle]}
                  />
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.handleLike(post._id, post.likes)}
                      style={Styles.imageButtonStyle}
                    >
                      <Text style={Styles.imageButtonText}>
                        {post.likes.length}
                        Like
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate("SinglePost", {
                          id: post._id
                        })
                      }
                      style={Styles.imageButtonStyle}
                    >
                      <Text style={Styles.imageButtonText}>
                        {post.comment.length}
                        Comment
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

let mapStateToProps = state => {
  return { state };
};
export default connect(mapStateToProps)(Profile);
