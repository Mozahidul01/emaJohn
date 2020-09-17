import React from "react";
import "./Cart.css"
import { Container, Row, Col } from 'react-bootstrap';

const Cart = (props) => {
  const cart = props.cart;
  // const productPrice = cart.reduce( (total, product) => total + product.price, 0);
  let productPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    productPrice = productPrice + product.price * product.quantity;
  }

  let shippingCost = 0;
  if (productPrice > 35) {
    shippingCost = 0;
  } else if (productPrice > 15) {
    shippingCost = 4.99;
  } else if (productPrice > 0) {
    shippingCost = 12.99;
  }

  const tax = productPrice / 5;

  const formateNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  const grandTotal = productPrice + shippingCost + tax;

  return (
    <Container>
    
      <Row className="text-center">
        <Col><h3 className="order-summary"> Order Summary </h3></Col>
      </Row>
      
      <Row>
        <Col xs={8}>
          <p className="order-item"> Items Ordered : </p>
          <p className="products-price"> Products Price : </p>
          <p className="shipping-cost"> Shipping Cost : </p>
          <p className="tax-vat"> Tax + VAT : </p>
        </Col>
        
        <Col xs={4}>
          <p className="number">{cart.length} </p>
          <p className="number">${formateNumber(productPrice)} </p>
          <p className="number">${formateNumber(shippingCost)} </p>
          <p className="number">${formateNumber(tax)} </p>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <div className="divider"></div>
        </Col>
      </Row>
      
      <Row>
        <Col xs={8}>
          <p className="total-price"> Total price : </p> 
        </Col>
        <Col xs={4}>
          <p className="number">$ {formateNumber(grandTotal)}</p>
        </Col>
      </Row>
          { props.children }
    </Container>
  );
};

export default Cart;
