import './App.css';
import React, { Component } from "react";
import styled from 'styled-components';
import { Switch, Route, Link  } from "react-router-dom";

import Shop from "./components/Shop";
import FilterBar from "./components/FilterBar";
import HeadBar from "./components/headbar/HeadBar";
import Item from "./components/Item";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const ShopContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    console.log("constructor running");
    this.state = {
      apiLink: "https://demo7242716.mockable.io/products",
      items: [],
      searchItems: []
    };
  }

  componentDidMount() {
      fetch(this.state.apiLink, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(res => {
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          return res.json();;
      })
      .then((data) => {
          console.log("response 2",data.products)
          this.setState({ items: data.products });
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
  }

  searchItemHandler = e => {
    console.log("search running", e.target.value);
    let searchTerm = e.target.value;
    const items = this.state.items.filter(item => {
      return item.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });
    this.setState({ searchItems: items });
    console.log(this.state.searchItems);
  };

  render() {  
    return (
      <Container>
        <HeadBar searchItems={this.searchItemHandler}/>
        <ShopContainer>
          <FilterBar />

          <Route exact path="/" render={(props) => (<Shop  {...props} items={ this.state.searchItems.length > 0
                  ? this.state.searchItems
                  : this.state.items} />)} />

          {/* <Shop items={ this.state.searchItems.length > 0
                  ? this.state.searchItems
                  : this.state.items}/> */}

          <Route path="/item/:itemId" render={(props) => (<Item  {...props} items={this.state.items} />)} />
        </ShopContainer>
        {/* <Route path="/item/:itemId" render={(props) => (<Item  {...props} items={this.state.items} />)} /> */}
      </Container>
    );
  }
}

export default App;