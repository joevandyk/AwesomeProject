/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [], loading: true }

    fetch('https://www.tanga.com/deals/men.json?per_page=5')
      .then((response) => response.json())
      .then((responseJson) => this.setState({products: responseJson}))
      .catch((error) => console.error(error))
      .finally(() => this.setState({loading: false}))
  }

  render() {
    const products = this.state.products.map((product, i) => {
      return(
        <View style={styles.card} key={i}>
          <Image style={styles.productImage} source={{uri: product.images[0].url}} />
          <Text style={styles.productName}>{product.name}</Text>
          <Text>
            <Text style={styles.productPrice}>${product.prices.normal_price}</Text>
            &nbsp; &nbsp;
            <Text style={styles.msrp}>${product.prices.msrp}</Text>
          </Text>
        </View>
      )
    })

    var loading = null
    if (this.state.loading) {
      loading = <Text style={styles.welcome}>Loading...</Text>
    }

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tanga So Hot Right Now</Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            {loading}
            {products}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width
const defaultFontSize = 18

const styles = StyleSheet.create({
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
    fontSize: defaultFontSize
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
    flexDirection: 'row',
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
