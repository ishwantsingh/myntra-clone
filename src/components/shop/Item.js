import React from "react";
import styled from 'styled-components';
import { Switch, Route, Link  } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8.1vh 2% 0 0vw;
  padding: 0 0 0 12vw;
  // margin: 12vh 2% 0 20vw;
  background-color: white;
  z-index: 1000;
  a {
      text-decoration: none;
      color: black;
      width: 100%;
  }
  .product-name {
      width: 100%;
      font-size: 2rem;
      color: #9D9FA8;
  }
  .product-brand {
    font-weight: 600;
    font-size: 2.5rem;
  }
  .item-details-container {
      width: 50%;
      height: 6rem;
      display: flex;
      flex-direction: column;
      justify-self: flex-start;
      justify-content: space-evenly;
      margin: 3vh 0 0 3vw;
  }
  .item-details {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      justify-content: space-evenly;
      height: 5rem;
  }
  p {
      margin: 0;
  }
`;

const ItemGallery = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
  height: 88vh;
`

const Itemcard = styled.div`
  width: 16rem;
  height: 27rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 35px;
`;
const Itemimage = styled.img`
  width: 45%;
  height: 55%;
  display: flex;
  align-items: center;
  margin: 10px;
`;

function Item(props) {
  console.log(props.match.params.itemId);
  const item = props.items.find(item => `${item.productId}` === props.match.params.itemId);
  console.log(item,"item");
  if (!item) return <h2>No Item Found...</h2>;
  return (
        <Container>
          <ItemGallery className="item-gallery">
          {item.images.map(itemImage => (
                  <Itemimage
                    src={itemImage.src}
                    alt={item.productName}
                    key={item.productId + itemImage.view}
                />
            ))}
          </ItemGallery>
          
          <div className="item-details-container">
              <div className="item-details">
                  <p className="product-brand">{item.brand}</p>
                  <p className="product-name">{item.additionalInfo.length >25 ? item.productName.slice(0,25)+ "..." : item.additionalInfo}</p>
                  <p>Rs. {item.price}</p>
              </div>
          </div>
        </Container>
  );
}

export default Item;
