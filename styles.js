import {
  StyleSheet,
  Dimensions
} from 'react-native'

const deviceWidth = Dimensions.get('window').width
const defaultFontSize = deviceWidth / 20

export default StyleSheet.create({
  app: {
    flex: 1
  },
  productImage: {
    width: deviceWidth,
    height: deviceWidth
  },
  header: {
    backgroundColor: '#ababab',
    flexDirection: 'row',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  headerText: {
    color: '#ffffff',
    fontSize: deviceWidth / 15
  },
  productPrice: {
    color: '#c4262e',
    fontSize: defaultFontSize
  },
  msrp: {
    fontSize: defaultFontSize * 0.8,
    textDecorationLine: 'line-through'
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10
  },
  productName: {
    fontSize: defaultFontSize
  },
  card: {
    flexDirection: 'column',
    marginBottom: 20
  },
  welcome: {
    fontSize: defaultFontSize * 1.5,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
