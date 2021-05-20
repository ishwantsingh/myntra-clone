import React from 'react'
import styled from 'styled-components';

import Spinnerz from "../assets/spinner.gif"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  .Loader {
    position: fixed;
    left: 15vw;
    top: 8vh;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    height: 100vh;
    background-color: white;
    margin-left: -15rem;
 }
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
`
const Spinner = () => {
    return (
        <Container>
            <div className="Loader">
                    <Image src={Spinnerz}/>
            </div>
      </Container> 
    )
}

export default Spinner;