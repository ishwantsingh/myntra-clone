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
  .brands-div {
    height: 100%;
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
          <div className="brands-div">
          <Filter uniqueBrands={this.props.uniqueBrands}/>

          </div>
        </Container>
      );
    }
  }