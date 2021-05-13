import React from "react";
import styled from "styled-components";

import Filter from "./Filter"

const Container = styled.div`
  width: 15vw;
  height: 90vh;
  position: fixed;
  top: 8vh;
  left: 0px;
  border-right: 1px solid #e1e0e0;
  a {
      text-decoration: none;
      color: black;
  }
  .filter-div {
    height: 250px;
    overflow: auto;
    padding: 0 0 0 15%;
  }
  .filter-div::-webkit-scrollbar {
    width: 5px;
  }
  .filter-div::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 1px;
  }
  .filter-div::-webkit-scrollbar-thumb {
    background: #9e9e9e;
    border-radius: 3px;
  }
  .genders {
    height: 90px;
  }
  .seasons {
    height: 85px;
    overflow: hidden
  }
  .categories {
    height: 150px;
  }
  .filter-name {
    font-size: 16px;
    font-weight: 500;
    width: 84%;
    line-height: 1;
    padding: 15px 0 0 16%;
    margin: 15px 0 10px 0;
    border-top: 1px solid #E1E0E0;
  }
  .brand {
    border-top : 0px;
  }
  .heading {
    width: 84%;
    font-size: 20px;
    font-weight: 500;
    margin: 0 auto;
    height: 50px;
    border-bottom: 1px solid #E1E0E0;
    display: flex;
    align-items: center;
    padding-left: 16%
  }
`;


export default class FilterBar extends React.Component {
    constructor() {
      super();
      this.state = {
        
      };
    }

    render() {
      return (
        <Container>
          <div className="heading">
            Filters
          </div>
          <p className="filter-name brand">BRAND</p>
          <div className="filter-div brands">
            <Filter uniqueBrands={this.props.uniqueBrands}/>
          </div>
          <p className="filter-name">CATEGORY</p>
          <div className="filter-div categories">
            <Filter uniqueBrands={this.props.uniqueCategories}/>
          </div>
          <p className="filter-name">GENDER</p>
          <div className="filter-div genders">
            <Filter uniqueBrands={this.props.uniqueGenders}/>
          </div>
          <p className="filter-name">SEASON</p>
          <div className="filter-div seasons">
            <Filter uniqueBrands={this.props.uniqueSeasons}/>
          </div>
        </Container>
      );
    }
  }