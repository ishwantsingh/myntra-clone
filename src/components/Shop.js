import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-self: flex-end;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  border: 1px solid black;
  margin-right: 3%;
  a {
      text-decoration: none;
      color: black;
  }
  .product-name {
      width: 100%;
  }
`;

const Itemcard = styled.div`
  width: 16rem;
  height: 25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border 1px solid black;
`;
const Itemimage = styled.img`
  width: 16rem;
  height: 19rem;
  display: flex;
  align-items: center;
`;

export default class Shop extends React.Component {
    constructor() {
      super();
      this.state = {
        apiLink: "https://demo7242716.mockable.io/products",
        items: []
      };
    }
  
    componentDidMount() {
        fetch(this.state.apiLink, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();;
        })
        .then((data) => {
            console.log("response 2",data.products)
            this.setState({ items: data.products });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
    }
  
    render() {
        console.log(this.state.items,"2")
      return (
        <Container>
            {this.state.items.map(item => (
                <Itemcard key={item.productId}>
                <Itemimage
                    src={item.searchImage}
                    alt={item.productName}
                />

                <Link to={`/item/${item.productId}`}>
                    <p className="product-name">{item.productName.length >23 ? item.productName.slice(0,23)+ "..." : item.productName}</p>
                </Link>
                <p>Rs. {item.price}</p>
                </Itemcard>
            ))}
            :p
        </Container>
      );
    }
  }