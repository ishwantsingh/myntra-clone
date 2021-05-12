import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 78%;
  height: 80%;
  display: flex;
  justify-self: flex-end;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 12vh 2% 0 0;
  a {
      text-decoration: none;
      color: black;
      width: 100%;
  }
  .product-name {
      width: 100%;
      color: #9D9FA8;
  }
  .item-details-container {
      width: 100%;
      height: 6rem;
      display: flex;
      flex-direction: column;
      justify-self: flex-start;
      justify-content: space-evenly;
      margin: 0 auto;
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
  width: 16rem;
  height: 21rem;
  display: flex;
  align-items: center;
`;

export default function Shop(props) {
    return (
        <Container>
            {props.items.map(item => (
                <Itemcard key={item.productId}>
                <Itemimage
                    src={item.searchImage}
                    alt={item.productName}
                />
                <div className="item-details-container">
                    <Link to={`/item/${item.productId}`} className="item-details">
                        <p className="product-brand">{item.brand}</p>
                        <p className="product-name">{item.additionalInfo.length >25 ? item.productName.slice(0,25)+ "..." : item.additionalInfo}</p>
                        <p>Rs. {item.price}</p>
                    </Link>
                </div>
                </Itemcard>
            ))}
        </Container>
    );
}