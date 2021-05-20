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
  .Loader {
    position: fixed;
    left: 15vw;
    top: 8vh;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
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
                {/* <Dimmer active inverted > */}
                    {/* <Loader active inverted /> */}
                    <Image src={Spinnerz}/>
                {/* </Dimmer> */}
            </div>
      </Container> 
    )
}

export default Spinner;