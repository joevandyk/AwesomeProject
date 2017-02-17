import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  ListView,
  Image,
  View
} from 'react-native';
import styles from './styles'

const Header = function({page}) {
  return <View style={styles.header}>
    <Text style={styles.headerText}>Tanga So Hot Right Now {page} </Text>
  </View>
}

const ProductImage = function({product}) {
  const placeholder = "https://www.tanga.com/assets/tanga_engine/placeholders/tanga_product.png"
  const url = product.images[0] ? product.images[0].url : placeholder
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

const Loading = function({loading}) {
  return loading ? <Text style={styles.welcome}>Loading...</Text> : null
}

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 })
    this._data = []
    this.state = { products: ds, loading: true, page: 0 }
  }

  componentDidMount() {
    this.nextPage()
  }

  fetch() {
    fetch(`https://www.tanga.com/deals/women.json?per_page=5&page=${this.state.page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this._data = this._data.concat(responseJson)
        this.setState({products: this.state.products.cloneWithRows(this._data)})
       })
      .catch((error) => console.error(error))
      .finally(() => this.setState({loading: false}))
  }

  nextPage() {
    this.setState({loading: true, page: this.state.page + 1}, this.fetch)
  }

  render() {
    return (
      <View style={styles.app}>
        <Header page={this.state.page}/>
        <ListView
          style={styles.container}
          onEndReached={() => { this.nextPage() }}
          dataSource={this.state.products}
          enableEmptySections={true}
          renderFooter={() => <Loading loading={this.state.loading} />}
          renderRow={(rowData) => <Card product={rowData}/>} />
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
