import React, {Component} from 'react';
import {onScroll, AsyncStorage} from 'react-native';
import {callApi} from '../../Utilities/utility';
import {includes, orderBy} from 'lodash';

export default class TimelineBase extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      AllPosts: [],
      filteredPost: [],
      offset: 0,
      count: 0,
      token: this.props.state.token.tokenId,
      query: {
        filter: {},
        fields: {},
        option: {skip: 0, limit: 0, sort: {uploadTime: -1}},
      },
    };
  }
  componentDidMount() {
    //console.warn('propss--------', this.props.state);
    // callApi('get', 'timeline/count').then(response => {
    //   this.setState({count: response.data.count});
    //   //console.warn('count------', this.state.count);
    //   this.getData();
    // });
    this.getData();
  }

  getData = () => {
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
        this.setState({
          AllPosts: this.state.AllPosts.concat(response.data),
          filteredPost: this.state.filteredPost.concat(response.data),
        });
      })
      .catch(err => {
        console.log('error>>>>', err);
      });
  };

  handleClick = pictureId => {
    this.props.navigation.navigate('SinglePost', {id: pictureId});
  };
  handleDrawer = () => {
    this.props.navigation.openDrawer();
  };

  handleRightDrawer = () => {
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
          this.setState({AllPosts: response.data, filteredPost: response.data});
        })
        .catch(err => {
          console.log('error--', err);
        });
    }
  };

  handleOldest = () => {
    let oldestFirst = orderBy(this.state.AllPosts, 'uploadTime', 'asec');
    this.setState({filteredPost: oldestFirst});
  };

  handleLatest = () => {
    let latestFirst = orderBy(this.state.AllPosts, 'uploadTime', 'desc');
    this.setState({filteredPost: latestFirst});
  };
  handleMostCommented = () => {
    let mostCommented = this.state.AllPosts.sort((a, b) => {
      return b.comment.length - a.comment.length;
    });
    this.setState({filteredPost: mostCommented});
  };

  handleMostLikes = () => {
    let mostLikes = this.state.AllPosts.sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
    this.setState({filteredPost: mostLikes});
  };
}
