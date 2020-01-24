import React, {Component, Fragment} from 'react';
import {View, Text, Button, Image} from 'react-native';
class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Fragment>
        <View style={{flex: 1}}>
          <Text>This is Home Page</Text>
          <Button
            title="Press me"
            onPress={() => this.props.navigation.navigate('Page1')}
          />
          <Image
            style={{width: 300, height: 500}}
            source={require('./images/dog_PNG50348.png')}
          />
        </View>
      </Fragment>
    );
  }
}
export default Home;
