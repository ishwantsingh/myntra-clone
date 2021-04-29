import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-self: flex-start;
  align-self: flex-start;
  border-bottom: 1px solid #e1e0e0;
  a {
      text-decoration: none;
      color: black;
  }
`;


export default class HeadBar extends React.Component {
    constructor() {
      super();
      this.state = {
        
      };
    }

    render() {
      return (
        <Container>
            Head Bar
        </Container>
      );
    }
  }