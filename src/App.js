import './App.css';
import React, { Component } from "react";
import styled from 'styled-components';
import { Route } from "react-router-dom";

import Shop from "./components/shop/Shop";
import FilterBar from "./components/filter/FilterBar";
import HeadBar from "./components/headbar/HeadBar";
import Item from "./components/shop/Item";
import Spinner from "./components/Spinner";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .Loader {
    position: fixed;
    left: 15vw;
    top: 8vh;
    width: 100%;
    height: 100%;
    z-index: 9999;
 }
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
      loading: false
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
        this.setState({loading: true});
          if (!res.ok) {
            this.setState({loading: false});
            throw new Error('Network response was not ok');
          }
          return res.json();;
      })
      .then((data) => {
          this.setState({ items: data.products ,searchItems: data.products});

          data.products.map(product => {
          this.setState({brands: [...this.state.brands, product.brand], genders: [...this.state.genders, product.gender],categories: [...this.state.categories, product.category], seasons: [...this.state.seasons, product.season] })
          return product;
        })

          this.setState({uniqueBrands: [...new Set(this.state.brands)], uniqueGenders: [...new Set(this.state.genders)], uniqueCategories: [...new Set(this.state.categories)], uniqueSeasons: [...new Set(this.state.seasons)], loading: false})
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          window.alert("Error fetching data. Please try cheching your internet connection and refreshing the page.")
          this.setState({loading: false});
        });
  }

  searchItemHandler = e => {
    let searchTerm = e.target.value;

    const items = this.state.items.filter(item => {
      return item.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });

    this.setState({ searchItems: items });
  };

  filterItemHandler = (e, value, type, number) => {
      var filter = this.state.selectedFilter;

      if(e.target.checked) {
          filter[number].push(value);

          let newFilterProductsArray = [];

          let filterTypeCount = 0;

          for(let i=0; i<4; i++) {
            if(filter[i].length === 0) {
              continue;
            }  else {
              filterTypeCount++;
            } 
          }
          var items;
          if(filterTypeCount < 2) {
            items = this.state.items.filter(item => {
              return filter[number].includes(item[type]);
            });
          } else {
            items = this.state.searchItems.filter(item => {
              return filter[number].includes(item[type]);
            });
          }

          newFilterProductsArray = [...new Set([...newFilterProductsArray,...items])];

          this.setState({ searchItems:  newFilterProductsArray });
      
          return items;
      
      }
      else {

        let newFilterProductsArray = [];
        let filterTypeCount = 0;

        for(let i=0; i<4; i++) {
          if(filter[i].length === 0) {
            continue;
          }  else {
            filterTypeCount++;
          } 
        }

        if(filterTypeCount < 2) {
          filter[number] = filter[number].filter(filterType =>  !value.includes(filterType));

          items = this.state.items.filter(item => {
            return filter[number].includes(item[type]);
          });
        } else if( filterTypeCount > 1 ) {

          filter[number] = filter[number].filter(filterType =>  !value.includes(filterType));

          items = this.state.items.filter(item => {
            for(let i = 0; i<4; i++) {
              if(i === 0) {
                return filter[i].includes(item.brand)
              } else if( i === 1) {
                return filter[i].includes(item.category)
              } else if( i === 2) {
                return filter[i].includes(item.gender)
              } else if( i === 3) {
                return filter[i].includes(item.season)
              }
            }      
            return false;
          });
        }

            newFilterProductsArray = [...new Set([...newFilterProductsArray,...items])];

            this.setState({ searchItems:  newFilterProductsArray,selectedFilter: filter });
      
            return items;
      }

  };

  clearFilters = () => {
    this.setState({ selectedFilter: [[],[],[],[]], searchItems: this.state.items});
    let filterCheckboxes = document.querySelectorAll(".filter-checkbox");
    for (var i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].checked = false;
    }
  }

  render() {  
    return (
      <Container>
        <HeadBar searchItems={this.searchItemHandler}/>
        <ShopContainer>
          <FilterBar filterItemHandler={this.filterItemHandler} clearFilters={this.clearFilters} uniqueBrands={this.state.uniqueBrands} uniqueGenders={this.state.uniqueGenders} uniqueCategories={this.state.uniqueCategories} uniqueSeasons={this.state.uniqueSeasons}/>

          {this.state.loading? 
          <Spinner /> 
          : 
          <Route exact path="/" render={(props) => (<Shop  {...props} items={ this.state.searchItems.length > 0
          ? this.state.searchItems
          : this.state.items} />)} />
                 } 

          <Route path="/item/:itemId" render={(props) => (<Item  {...props} loading={this.state.loading} items={this.state.items} />)} />
        </ShopContainer>
      </Container>
    );
  }
}

export default App;