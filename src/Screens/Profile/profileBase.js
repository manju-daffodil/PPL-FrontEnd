import React, {Component} from 'react';

import {callApi} from '../../Utilities/utility';
import {includes} from 'lodash';

export default class ProfileBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllPosts: [],
      token: this.props.state.token.tokenId,
      query: {
        filter: {userId: this.props.state.userInfo._id},
        fields: {},
        option: {skip: 0, limit: 0, sort: {uploadTime: -1}},
      },
    };
  }

  componentDidMount() {
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.state.token}`,
    };
    callApi(
      'get',
      `timeline/getPostData?params=${JSON.stringify(this.state.query)}`,
      {},
      headers,
    )
      .then(response => {
        this.setState({AllPosts: response.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePress = () => {
    this.props.navigation.openDrawer();
  };

  handleLike = (imageID, Likes) => {
    let imageData = {imageId: imageID, userId: this.props.state.userInfo._id};
    if (!includes(Likes, imageData.userId)) {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      };
      callApi('post', 'timeline/Likes', imageData, headers)
        .then(response => {
          this.setState({AllPosts: response.data});
        })
        .catch(err => {
          console.log('error--', err);
        });
    }
  };

  handleClick = pictureId => {
    this.props.navigation.navigate('SinglePost', {id: pictureId});
  };
}
