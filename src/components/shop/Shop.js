import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 73%;
  height: 80%;
  display: flex;
  justify-self: flex-end;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 12vh 6% 0 0;
  a {
      text-decoration: none;
      color: black;
      width: 100%;
  }
  .product-brand {
      font-size: 16px;
      font-weight: 600;
      line-height: 1;
      margin: 0 0 6px 0;
  }
  .product-name {
      font-size: 14px;
      width: 100%;
      color: #535766;
      line-height: 1;
  }
  .item-details-container {
      width: 100%;
      height: 5rem;
      display: flex;
      flex-direction: column;
      justify-self: flex-start;
      justify-content: space-evenly;
      margin: 0 auto;
      padding: 5px 8px 0 8px;
  }
  .item-details {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 5rem;
  }
  p {
      margin: 0;
  }
  .price-details {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    margin: 6px 0 0px 0;
    padding: 0.2rem 0 0 0;
    align-items: baseline;
  }
  .display-price {
    margin: 0 0.5rem 0 0;
    font-weight: 600;
    line-height: 15px;
  }
  .max-price {
    font-size: 12px; 
    font-weight: 600;
    color: #9D9FA8;
    text-decoration: line-through;
    text-decoration-color: #535665;
  }
  .discount-price {
    font-size: 12px;
    margin: 0 0 0 0.5rem;
    color: #FF905A;
  }
`;

const Itemcard = styled.div`
  width: 13rem;
  height: 23rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 15px 30px 15px;
`;
const Itemimage = styled.img`
  width: 13rem;
  height: 17rem;
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
                    <p className="product-name">{item.additionalInfo.length >21 ? item.productName.slice(0,21)+ "..." : item.additionalInfo}</p>
                    <div className="price-details">
                        <p className="display-price">Rs. {item.price}</p>

                        <p className="max-price">Rs. {item.mrp}</p>

                        <p className="discount-price">{item.discountDisplayLabel}</p>

                    </div>
                </Link>
            </div>
            </Itemcard>
        ))}
    </Container>
  );
}