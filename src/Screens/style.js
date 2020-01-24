import { StyleSheet, Dimensions } from 'react-native';
const color = {
  blue: 'blue',
  white: 'white',
  navyBlue: '#9BBA',
  pink: '#F47373',
  grey: '#697689',
  lightGreen: '#37D67A',
  lightBlue: '#2CCCE4',
  yellow: '#00ffff',
  greyBlack: '#555555',
  lightYellow: '#dce775',
  peach: '#ff8a65',
  purple: '#ba68c8',
};
const font = {};
const centerText = {
  justifyContent: 'center',
  alignItems: 'center',
};
const Styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  child: {
    marginBottom: 10,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: color.white,
    marginHorizontal: 60,
  },

  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    marginLeft: 10,
  },
  textInput: { flex: 1, marginTop: 5 },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: '#d14',
    textAlign: 'center',
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    opacity: 0.7,
  },
  DrawerContent: {
    height: 800,
    backgroundColor: '#9BBA',
  },
  timelineText: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  imageData: {
    backgroundColor: '#999BBA',
    height: 100,
    borderRadius: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  timelineImageStyle: {
    borderWidth: 2,
    borderColor: 'black',
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height - 400,
    resizeMode: 'cover',
    marginLeft: 5,
  },
  imageButtonText: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  imageButtonStyle: {
    marginLeft: 10,
    backgroundColor: color.grey,
    borderColor: 'black',
    borderWidth: 2,
  },
  drawerContentStyles: {
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: '#9BBA',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
});
export { Styles, color, centerText };
