import './App.css';
import React, { Component } from "react";
import styled from 'styled-components';
import { Switch, Route, Link  } from "react-router-dom";

import Shop from "./components/shop/Shop";
import FilterBar from "./components/filter/FilterBar";
import HeadBar from "./components/headbar/HeadBar";
import Item from "./components/shop/Item";

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
    this.filterPage = React.createRef();
    // this.projectsChild = React.createRef();
    // this.skillsChild = React.createRef();
    // this.hobbiesChild = React.createRef();
    this.state = {
      apiLink: "https://demo7242716.mockable.io/products",
      items: [],
      searchItems: [],
      brands: [],
      uniqueBrands: [],
      genders: [],
      uniqueGenders: [],
      categories: [],
      uniqueCategories: [],
      seasons: [],
      uniqueSeasons: [],
      selectedFilter: [],
      isClicked: false
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

          data.products.map(product => {
          this.setState({brands: [...this.state.brands, product.brand], genders: [...this.state.genders, product.gender],categories: [...this.state.categories, product.category], seasons: [...this.state.seasons, product.season] })
          })

          this.setState({uniqueBrands: [...new Set(this.state.brands)], uniqueGenders: [...new Set(this.state.genders)], uniqueCategories: [...new Set(this.state.categories)], uniqueSeasons: [...new Set(this.state.seasons)]})
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

  filterItemHandler = (value, type, clicked) => {
    console.log("state",this.state)
    let searchTerm = value;
    if(type ==="brand") {
      this.setState({ value, selectedFilter: [...this.state.selectedFilter, value] })
      let filter = [];
      filter.push(value);
      // this.state.selectedFilter.map(filter => {
      filter.map(filter => {

      console.log("1")

        var items = this.state.items.filter(item => {
          // return item.brand.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
          // return item.brand.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
          return item.brand.toLowerCase() === filter.toLowerCase();
        console.log("2")
        });
        this.setState({ searchItems:  this.state.searchItems.concat(items) });

        return items;
      })
      // this.setState({ searchItems:  items });
      console.log("2state",this.state)

      // const items = this.state.items.filter(item => {
      //   // return item.brand.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      //   return item.brand.toLowerCase().indexOf(this.state.selectedFilter.map(filter => filter.toLowerCase())) !== -1;
      // });
      // this.setState({ searchItems: items });
    }
    else if(type ==="category") {
      const items = this.state.items.filter(item => {
        return item.category.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      this.setState({ searchItems: items });
    }
    else if(type ==="gender") {
      const items = this.state.items.filter(item => {
        return item.gender.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      this.setState({ searchItems: items });
    }
    else if(type ==="season") {
      const items = this.state.items.filter(item => {
        return item.season.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      this.setState({ searchItems: items });
    }

  };

  render() {  
    console.log("st3",  this.state)
    return (
      <Container>
        <HeadBar searchItems={this.searchItemHandler}/>
        <ShopContainer>
          <FilterBar filterItemHandler={this.filterItemHandler} ref={this.filterPage} uniqueBrands={this.state.uniqueBrands} uniqueGenders={this.state.uniqueGenders} uniqueCategories={this.state.uniqueCategories} uniqueSeasons={this.state.uniqueSeasons}/>

          <Route exact path="/" render={(props) => (<Shop  {...props} items={ this.state.searchItems.length > 0
                  ? this.state.searchItems
                  : this.state.items} />)} />

          <Route path="/item/:itemId" render={(props) => (<Item  {...props} items={this.state.items} />)} />
        </ShopContainer>
      </Container>
    );
  }
}

export default App;