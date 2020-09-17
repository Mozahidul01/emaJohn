import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col } from 'react-bootstrap';
import './Product.css'
import { Link } from 'react-router-dom';

const products = (props) => {
    const {img, name, price, seller, stock, key} = props.product;
    return (
        <Container className="product">
            <Row>
                <Col md={4}>
                    <div className="product-img">
                        <img src={img} alt=""/>
                    </div>
                </Col>
                
                <Col md={8}>
                    <div className="product-details">
                        <h3 className="product-name"><Link to={"/product/"+key }className="name" >{name}</Link></h3>
                        <p className="product-seller">by: {seller}</p>
                        <h4 className="product-price">Price: ${price}</h4>
                        <p className="product-stock">Only {stock} left in stock</p>
                        {props.showAddToCart && <button className="cart-btn" onClick= { () => props.handleCart(props.product)}>Add to Cart <FontAwesomeIcon icon={faShoppingCart}/></button>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default products;