import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';
import styles from './styles'

const Header = function() {
  return <View style={styles.header}>
    <Text style={styles.headerText}>Tanga So Hot Right Now</Text>
  </View>
}

const ProductImage = function({product}) {
  const placeholder = "https://www.tanga.com/assets/tanga_engine/placeholders/tanga_product.png"
  const url = product.images[2] ? product.images[2].url : placeholder
  return <Image style={styles.productImage} source={{uri: url}} />
}

const Card = function({product}) {
  return <View style={styles.card}>
    <ProductImage product={product} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text>
      <Text style={styles.productPrice}>${product.prices.normal_price}</Text>
      &nbsp; &nbsp;
      <Text style={styles.msrp}>${product.prices.msrp}</Text>
    </Text>
  </View>
}

const CardList = function({products}) {
  return <View>
  {
    products.map((product, i) => <Card product={product} key={i} />)
  }
  </View>
}

const Loading = function({loading}) {
  return loading ? <Text style={styles.welcome}>Loading...</Text> : null
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
    return (
      <View style={styles.app}>
        <Header />
        <ScrollView style={styles.container}>
          <Loading loading={this.state.loading} />
          <CardList products={this.state.products} />
        </ScrollView>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
