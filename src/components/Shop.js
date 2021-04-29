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
  margin: 2% 2% 0 0;
  a {
      text-decoration: none;
      color: black;
      width: 100%;
  }
  .product-name {
      width: 100%;
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
                    <p className="product-name">{item.productName.length >25 ? item.productName.slice(0,25)+ "..." : item.productName}</p>
                </Link>
                <p>Rs. {item.price}</p>
                </Itemcard>
            ))}
            :p
        </Container>
      );
    }
  }