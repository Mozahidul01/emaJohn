import React from 'react';
import './ReviewItem.css'
import { Container, Row, Col } from 'react-bootstrap';

const ReviewItem = (props) => {
    const {name, quantity,img, price, key} = props.product;
    return (
        <Container className="product">
            <Row>
                <Col md={4}>
                    <div className="product-img">
                        <img className="review-img" src={img} alt=""/>
                    </div>
                </Col>
                
                <Col md={8}>
                    <div className="product-details">
                        <h3 className="product-name">{name}</h3>
                        <Row>
                            <Col xs={6}>
                                <p className="product-quantity">Quantity: {quantity}</p>
                            </Col>
                            <Col xs={6}>
                            <h4 className="product-price">Price: ${price}</h4>
                            </Col>
                        </Row>
                        <button className="remove-btn" onClick={() =>props.removeItem(key)}>Remove Item </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
        
};

export default ReviewItem;