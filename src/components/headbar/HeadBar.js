import React from "react";
import styled from "styled-components";

import logo from "../../assets/logo.png";

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
  #headbar {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: white;
    justify-content: flex-start;
    align-self: center;
  }
  .menu {
    color: black;
    font-size: 1.5rem;
    width: 30%;
    height: 100%;
    display: flex;
    margin: 0 0% 0 3%;
    align-self: center;
    align-items: center;
    align-content: center;
    justify-content: space-between;
  }
  .logo {
    width: 60px;
    height: 60px;
    margin-right: 25px;
  }
  .menu-item {
    width: 15%
    height: 30px;
    font-size: 14px;
    font-weight: 500;
    margin: 0 auto;
    align-self: center;
    padding-bottom: 4px;
    text-align: center;
  }
  .menu-item .wide {
      width: 30%;
  }
  .menu-item:hover {
    cursor: pointer;
    border-bottom-style: solid;
    border-bottom-width: 4px;
    transition: left .2s ease-out,border-color .5s ease-in;
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
           <section id="headbar">
                <nav class="menu ">
                    <img src={logo} className="logo" />
                    <div class="menu-item jsTest">MEN</div>
                    <div class="menu-item">WOMEN</div>
                    <div class="menu-item">KIDS</div>
                    <div class="menu-item wide">HOME {`&`} LIVING</div>
                    <div class="menu-item">BEAUTY</div>
                </nav>  
            </section>
        </Container>
      );
    }
  }