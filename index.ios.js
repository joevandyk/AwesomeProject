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

const Header = function() {
  return <View style={styles.header}>
    <Text style={styles.headerText}>Tanga So Hot Right Now</Text>
  </View>
}

const Card = function(props) {
  const product = props.product
  return <View style={styles.card}>
    <Image style={styles.productImage} source={{uri: product.images[0].url}} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text>
      <Text style={styles.productPrice}>${product.prices.normal_price}</Text>
      &nbsp; &nbsp;
      <Text style={styles.msrp}>${product.prices.msrp}</Text>
    </Text>
  </View>
}

const Loading = function({loading}) {
  if (loading) {
    return <Text style={styles.welcome}>Loading...</Text>
  } else { return null }
}

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [], loading: true, page: 2 }

    fetch(`https://www.tanga.com/deals/men.json?per_page=5&page=${this.state.page}`)
      .then((response) => response.json())
      .then((responseJson) => this.setState({products: responseJson}))
      .catch((error) => console.error(error))
      .finally(() => this.setState({loading: false}))
  }

  render() {
    const products = this.state.products.map((product, i) => <Card product={product} key={i} />)

    return (
      <View style={{flex: 1}}>
        <Header />
        <ScrollView style={styles.container}>
          <Loading loading={this.state.loading} />
          {products}
        </ScrollView>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width
const defaultFontSize = deviceWidth / 20

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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
