import React, {Component} from 'react';

import {includes} from 'lodash';

import {callApi} from '../../Utilities/utility';

export default class SinglePostBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: [],
      currentPost: [],
      comment: '',
      commentData: [],
      token: this.props.state.token.tokenId,
      query: {
        filter: {_id: this.props.navigation.state.params.id},
        field: {},
        option: {skip: 0, limit: 0, sort: {}},
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
        console.log('response', response.data);
        this.setState({
          currentPost: response.data[0],
          commentData: response.data[0].comment,
          like: response.data[0].likes,
        });
      })
      .catch(err => {
        console.log('Err--', err);
      });
  }

  handleChange = text => {
    this.setState({comment: text});
  };
  handleLike = (imageID, Likes) => {
    let imageData = {imageId: imageID, userId: this.props.state.userInfo._id};
    console.warn('Image data---', imageData);
    if (!includes(Likes, imageData.userId)) {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      };
      callApi('post', 'timeline/Likes', imageData, headers)
        .then(response => {
          this.setState({
            like: response.data[0].likes,
          });
        })
        .catch(err => {
          console.warn('error--', err);
        });
    }
  };
  uploadComment = () => {
    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.state.token}`,
    };
    let commentData = {
      comment: this.state.comment,
      imageId: this.state.query.filter._id,
      user: this.props.state.userInfo.firstname,
    };
    callApi('post', 'timeline/uploadComment', commentData, headers)
      .then(response => {
        this.setState({commentData: response.data[0].comment, comment: ''});
      })
      .catch(err => {
        console.log('Error--', err);
      });
  };
}
