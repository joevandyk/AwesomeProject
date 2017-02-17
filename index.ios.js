/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
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
          <Image source={{uri: product.images[0].url, width: 400, height: 400}} />
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

const styles = StyleSheet.create({
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
    fontSize: 30
  },
  productPrice: {
    color: '#c4262e',
    fontSize: 25
  },
  msrp: {
    fontSize: 20,
    textDecorationLine: 'line-through'
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10
  },
  productName: {
    fontSize: 25
  },
  card: {
    marginBottom: 20
  },
  welcome: {
    fontSize: 40,
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
