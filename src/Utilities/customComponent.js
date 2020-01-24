import React, {Component} from 'react';
import * as Images from './Images';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// import {Styles, color} from '../Screens/style';
export default class CustomComponent extends Component {
  render() {
    let {label, onClick = () => {}} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={Style.topButton}
        onPress={onClick}>
        <Text style={Style.topButtonText}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const Style = StyleSheet.create({
  topButton: {
    backgroundColor: 'black',
    paddingHorizontal: 7,
    borderColor: 'white',
    borderWidth: 1,
  },
  topButtonText: {color: 'white', fontWeight: 'bold'},
});

export const getImage = imageName => {
  return Images[imageName];
};
