import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 15%;
  height: 85vh;
  position: fixed;
  top:15vh;
  left:0px;
  justify-self: flex-start;
  align-self: flex-end;
  border: 1px solid red;
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