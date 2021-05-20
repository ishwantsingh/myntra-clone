import './App.css';
import React, { Component } from "react";
import styled from 'styled-components';
import { Route } from "react-router-dom";

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
      selectedFilter: [[],[],[],[]],
      isClicked: false,
      currentType: ""
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
          this.setState({ items: data.products ,searchItems: data.products});

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
    let searchTerm = e.target.value;
    const items = this.state.items.filter(item => {
      return item.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });
    this.setState({ searchItems: items });
  };

  filterItemHandler = (e,value, type,number) => {
      var filter = this.state.selectedFilter;

      if(e.target.checked) {
          filter[number].push(value);

          let newFilterArray = [];

          var count = 0;

          for(let i=0; i<4; i++) {
            if(filter[i].length == 0) {
              count = count;
            }  else {
              count++;
            } 
          }

          if(count < 2) {
            var items = this.state.items.filter(item1 => {
              return filter[number].includes(item1[type]);
            });
          } else {
            var items = this.state.searchItems.filter(item1 => {
              return filter[number].includes(item1[type]);
            });
          }

          newFilterArray = [...new Set([...newFilterArray,...items])];

          this.setState({ searchItems:  newFilterArray });
      
          return items;
      
      }
      else {
        let newFilterArray = [];
        var count = 0;

        for(let i=0; i<4; i++) {
          if(filter[i].length == 0) {
            count = count;
          }  else {
            count++;
          } 
        }

        if(count < 2) {
          filter[number] = filter[number].filter(item =>  !value.includes(item));

          var items = this.state.items.filter(item1 => {
            return filter[number].includes(item1[type]);
          });
        } else if( count > 1 ) {

          filter[number] = filter[number].filter(item =>  !value.includes(item));

          var items = this.state.items.filter(item1 => {
            for(let i = 0; i<4; i++) {
              if(i == 0) {
                return filter[i].includes(item1.brand)
              } else if( i == 1) {
                return filter[i].includes(item1.category)
              } else if( i == 2) {
                return filter[i].includes(item1.gender)
              } else if( i == 3) {
                return filter[i].includes(item1.season)
              }
            }        
          });
        }
            newFilterArray = [...new Set([...newFilterArray,...items])];

            this.setState({ searchItems:  newFilterArray,selectedFilter: filter });
      
            return items;
      }

  };

  render() {  
    return (
      <Container>
        <HeadBar searchItems={this.searchItemHandler}/>
        <ShopContainer>
          <FilterBar filterItemHandler={this.filterItemHandler} uniqueBrands={this.state.uniqueBrands} uniqueGenders={this.state.uniqueGenders} uniqueCategories={this.state.uniqueCategories} uniqueSeasons={this.state.uniqueSeasons}/>

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