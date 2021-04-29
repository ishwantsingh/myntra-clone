import './App.css';
import styled from 'styled-components';
import { Switch, Route } from "react-router-dom";

import Shop from "./components/Shop";
import FilterBar from "./components/FilterBar";
import HeadBar from "./components/headbar/HeadBar";

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

function App() {
  return (
    <Container>
      <HeadBar />
      <ShopContainer>
        <FilterBar />
        <Shop />
      </ShopContainer>
      
    </Container>
  );
}

export default App;
