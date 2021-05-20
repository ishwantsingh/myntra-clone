import React from "react";
import styled from 'styled-components';

import Spinner from "../Spinner";

import star from "../../assets/star.png"

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8.1vh 2% 0 0vw;
  padding: 4vh 0 0 12vw;
  background-color: white;
  z-index: 1000;
  a {
    text-decoration: none;
    color: black;
    width: 100%;
  }
  .product-name {
    width: 100%;
    font-size: 22px;
    color: #9D9FA8;
  }
  .product-brand {
    font-weight: 600;
    font-size: 26px;
  }
  .item-details-container {
      width: 50%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-self: flex-start;
      justify-content: flex-start;
      margin: 3vh 0 0 3vw;
  }
  .item-details {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      justify-content: space-evenly;
      height: 5rem;
  }
  .reviews {
    display: flex;
    flex-direction: row;
    width: 11rem;
    height: 2rem;
    color: #535665;
    border: 1px solid #E1E0E0;
    padding: 3px 3px 3px 10px;
    margin: 1rem 0 0 0;
    border-radius: 4px;
    font-weight: 500;
    font-color: black;
  }
  .star-image {
    display: flex;
    align-self: flex-end;
    margin: 0 6px 0 3px;
    width: 20px;
    height: 20px;
  }
  .price-details {
    font-size: 1.5rem;
    width: 32rem;
    display: flex;
    flex-direction: row;
    margin: 1rem 0 -3rem 0;
    padding: 0.5rem 0 0 0;
    align-items: baseline;
    border-top: 1px solid #D4D5D9;
  }
  .display-price {
    margin: 0 1rem 0 0;
    font-weight: 600;
  }
  .max-price {
    font-size: 1.3rem; 
    font-weight: 600;
    color: #9D9FA8;
    text-decoration: line-through;
    text-decoration-color: #535665;
  }
  .discount-price {
    font-size: 1.3rem;
    margin: 0 0 0 1rem;
    color: #FF905A;
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
  height: 88%;
`

const Itemimage = styled.img`
  width: 45%;
  height: 55%;
  display: flex;
  align-items: center;
  margin: 10px;
`;

class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0,0);
    //when product images are loaded, state changes and item page is displayed instead of spinner
    this.imageRef.current.addEventListener('load', () => { 
      this.setState({loaded: true})
  });
  }
 

render() {
  const item = this.props.items.find(item => `${item.productId}` === this.props.match.params.itemId);
  if (!item) return <h2>No Item Found...</h2>;

  return (
    <Container>
       {!this.state.loaded ?  <Spinner /> : null}
      <ItemGallery className="item-gallery">
      {item.images.map(itemImage => (
              <Itemimage
                ref={this.imageRef}
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
              
              <div className="reviews">
               {JSON.stringify(item.rating).length >3 ? JSON.stringify(item.rating).slice(0,3) : item.rating} <img src={star} className="star-image" alt="star"/> |   {item.ratingCount} Reviews
              </div>
              
              <div className="price-details">
                <p className="display-price">Rs. {item.price}</p>

                <p className="max-price">Rs. {item.mrp}</p>

                <p className="discount-price">{item.discountDisplayLabel}</p>

              </div>
          </div>
      </div>
    </Container>
);
}

  
}

export default Item;
