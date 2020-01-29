import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { connect } from "react-redux";
import Store from "../../Redux/store";
import { setToken, setUserInfo } from "../../Redux/actions";
import { callApi } from "../../Utilities/utility";

class AppAuthenticate extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // console.warn('AsyncStorage----', AsyncStorage.getItem('tokenID'));
    // console.warn('AsyncStorageUserInfo----', AsyncStorage.getItem('userInfo'));
    //AsyncStorage.removeItem("tokenID");
    // AsyncStorage.multiRemove(["tokenID","userInfo"]);
    AsyncStorage.getItem("tokenID")
      .then(data => {
        console.log("Token>>", data);
        let token = JSON.parse(data);

        if (token != null) {
          let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token.tokenId}`
          };
          let id = { _id: token._id };
          callApi("get", "isLogin", {}, headers)
            .then(response => {
              Store.dispatch(setToken(token));
              let userData = {
                _id: response.data[0]._id,
                firstname: response.data[0].firstname,
                email: response.data[0].email,
                lastname: response.data[0].lastname,
                profilePicture: response.data[0].profilePicture
              };
              Store.dispatch(setUserInfo(userData));
              this.props.navigation.navigate("MainStack");
              console.warn("userdata>>>>", userData);
              this.setState({ profileImage: userData.profilePicture });
            })
            .catch(error => {
              if (error.response.status === 401) {
                AsyncStorage.removeItem(data);
                this.props.navigation.navigate("AppComponent");
              }
            });
        } else this.props.navigation.navigate("AppComponent");
      })
      .catch(error => {
        console.log("Error", error);
      });
  }
  render() {
    return <View></View>;
  }
}
let mapStateToProps = state => {
  return { state };
};
export default connect(mapStateToProps)(AppAuthenticate);
