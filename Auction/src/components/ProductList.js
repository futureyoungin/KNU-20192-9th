import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { withNavigationFocus } from 'react-navigation';

import ProductItem from "./ProductItem";

import { fetchGetProduct } from '../fetch/Get';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      list: ""
    };
  }

  async componentDidMount() {
    let result = await fetchGetProduct();
    this.setState({ list: result })
  }

  async componentDidUpdate(prevProps) {
    if (!prevProps.isFocused) {
      let result = await fetchGetProduct();
      this.setState({ list: result })
    }
  }

  static defaultProps = {
    productList: Object(),
    toNavigate: "MyProductDetail"
  };

  renderProductItem({ item, index, separators }) {
    return (
      <ProductItem
        item={item}
        onPress={() =>
          this.props.navigation.push(this.props.toNavigate, {
            item: item
          })
        }
      />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.list}
          renderItem={this.renderProductItem.bind(this)}
          keyExtractor={item => item._id + ""}
          refreshing={this.state.refreshing}

          onRefresh={() => {
            this.setState({ refreshing: true });
            console.log("새로고침중입니다.");
            console.log("서버에 요청을 보냅니다.");
            // setTimeout(
            //   ()=>{
            //     console.log("요청 성공")
            //   },
            // )
            this.setState({ refreshing: false });
          }}
          ItemSeparatorComponent={({ highlighted, leadingItem }) => {
            // console.log(leadingItem) // 앞 component
            return (
              <View
                style={{
                  height: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  width: "90%",
                  backgroundColor: "gray"
                }}
              />
            );
          }}
        />
        
      </View>
    );
  }
}

export default withNavigationFocus(ProductList);
