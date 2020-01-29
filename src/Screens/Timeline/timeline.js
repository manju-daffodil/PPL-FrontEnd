import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/AntDesign";
import UserIcon from "react-native-vector-icons/Entypo";
import { Styles, color, centerText } from "../style";
import config from "../../Config/config";
import { connect } from "react-redux";
import TimelineBase from "./timelineBase";
import CustomButton from "../../Utilities/customComponent";

class Timeline extends TimelineBase {
  render() {
    let buttonComponent = [
      { label: "Oldest First", onClick: this.handleOldest },
      { label: "Latest First", onClick: this.handleLatest },
      { label: "MostLikes", onClick: this.handleMostLikes },
      { label: "MostCommented", onClick: this.handleMostCommented }
    ];
    return (
      <View style={[Styles.parent]}>
        <TouchableOpacity onPress={this.handleDrawer}>
          <Icon name="bars" size={40} color="black" />
        </TouchableOpacity>

        <Text style={Styles.text}>Timeline</Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: color.grey,
            marginBottom: 10,
            paddingVertical: 10
          }}
        >
          {buttonComponent.map((props, key) => {
            return <CustomButton key={key} {...props} />;
          })}
        </View>
        <ScrollView onScroll={this.onScroll}>
          {this.state.filteredPost.length > 0 &&
            this.state.filteredPost.map(post => {
              console.log("post", post);
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    marginBottom: 20,
                    backgroundColor: color.navyBlue
                  }}
                  onPress={() => this.handleClick(post._id)}
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
                    style={[Styles.timelineImageStyle, { marginBottom: 10 }]}
                  />
                  <View style={{ flexDirection: "row", marginBottom: 10 }}>
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
export default connect(mapStateToProps)(Timeline);
