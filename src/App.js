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
    let searchTerm = e.target.value;
    const items = this.state.items.filter(item => {
      return item.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });
    this.setState({ searchItems: items });
  };

  filterItemHandler = (e,value, type) => {
    console.log("1state",this.state)

    // if(type ==="brand" ) {
      var filter = this.state.selectedFilter;

      if(e.target.checked) {
        this.setState({ value, selectedFilter: [...this.state.selectedFilter, value] });
        filter = [...filter, value];
      }
      else {

        let removeFilterIndex = this.state.selectedFilter.indexOf(value);
        let removeFilterInd = filter.indexOf(value);

        console.log("selectedFilter2",this.state.selectedFilter)
        console.log("selectedFilter1",filter)

        filter = filter.filter(item => !value.includes(item))

        console.log("selected2",removeFilterIndex)
        console.log("selected1",removeFilterInd)

        this.setState({selectedFilter: filter});

        console.log("selectedFilter2",this.state.selectedFilter)

        console.log("6 filter",filter)
      }

      if(filter.length > 0 ) {
        let newFilterArray = [];

        filter.map(filter => {

          console.log("1",filter);

          var items = this.state.items.filter(item => {
            return item[type].toLowerCase() === filter.toLowerCase();
          });

          console.log("21",items);
          newFilterArray = [...new Set([...newFilterArray,...items])];

          this.setState({ searchItems:  newFilterArray });
      
          return items;
        })
      } else {
        this.setState({ searchItems:  [] });
      }

    // }

    // else if(type ==="brand" && !e.target.checked) {

    //   console.log("2state",this.state)

    //   this.setState({ value, selectedFilter: this.state.selectedFilter.splice(this.state.selectedFilter.indexOf(value),1) });
    //   let filter = this.state.selectedFilter;
    //   filter.splice(this.state.selectedFilter.indexOf(value),1);

    //   console.log("not checked", filter)

    //   filter.map(filter => { 
    //     console.log("not c2", filter)

    //     // var items = this.state.items.filter(item => {
    //     //   return item.brand.toLowerCase() === filter.toLowerCase();
    //     // });
    //     var items = this.state.searchItems.filter(item => {
    //       return item.brand.toLowerCase() === filter.toLowerCase();
    //     });
    //     console.log("not c3", items)


    //     this.setState({ searchItems:  [...new Set([...this.state.searchItems,...items])] });
    //     return items;
    //   })
    //   console.log(this.state,"notchecked");

    // }

    // else if(type ==="category") {
    //   const items = this.state.items.filter(item => {
    //     return item.category.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    //   });
    //   this.setState({ searchItems: items });
    // }
    // else if(type ==="gender") {
    //   const items = this.state.items.filter(item => {
    //     return item.gender.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    //   });
    //   this.setState({ searchItems: items });
    // }
    // else if(type ==="season") {
    //   const items = this.state.items.filter(item => {
    //     return item.season.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    //   });
    //   this.setState({ searchItems: items });
    // }

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