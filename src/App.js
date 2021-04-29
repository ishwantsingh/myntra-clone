import './App.css';
import styled from 'styled-components';
import { Switch, Route } from "react-router-dom";

import Shop from "./components/Shop";
import FilterBar from "./components/FilterBar";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <FilterBar />
      <Shop />
    </Container>
  );
}

export default App;
