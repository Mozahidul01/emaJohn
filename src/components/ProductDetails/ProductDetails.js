import React from 'react';
import './ProductDetails.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';

const ProductDetails = () => {

    const {productkey} = useParams();
    const product = fakeData.find(product => product.key === productkey);
    const {img, name, price, seller, stock, features} = product;
    console.log(product)
    
    return (
        <div className="product-box">
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <div className="product-img">
                            <img className="img" src={img} alt=""/>
                        </div>
                        
                    </Col>
                    
                    <Col md={8}>
                        <div className="content">
                            <h2 className="title">{name}</h2>
                            
                            <Row className="product-details">
                                <Col xs={4}>
                                    <h5 className="seller">By {seller}</h5>
                                    <h4 className="stock">Only {stock} available in stock.</h4>
                                </Col>
                                
                                <Col xs={8}>
                                    {features.map(features => 
                                        <div features={features}>
                                            <Row>
                                                <Col xs={5}>
                                                    <h3 className="features-description">{features.description}: </h3>
                                                </Col>
                                                
                                                <Col xs={7}>
                                                    <h3 className="features-value">{features.value}</h3>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            
                            <h3 className="product-price">Price : ${price}</h3>
                        </div>  
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetails;








