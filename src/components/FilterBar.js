import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 15%;
  height: 90vh;
  position: fixed;
  top: 8vh;
  left: 0px;
  border-right: 1px solid #e1e0e0;
  a {
      text-decoration: none;
      color: black;
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
            Filter Bar
        </Container>
      );
    }
  }