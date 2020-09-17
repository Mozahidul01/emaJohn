import React, { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager'
import fakeData from '../../fakeData';
import { useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart'
import { Container, Row, Col } from 'react-bootstrap';
import OrderImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {

    const [cart, setCart] = useState([]);
    const [ordered, setOrdered] = useState(false);
    const history = useHistory();
    
    const handleProceedCheckout = () => {
        history.push('/shipment');
    };
    
    const removeItem = (productKey) => {
        const newCart = cart.filter(products => products.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartsProduct = productKeys.map( key => {
            const product = fakeData.find( product => product.key === key);
            product.quantity = savedCart[key];
            return product;           
        });
        setCart(cartsProduct);
    }, []);
    
    let thankYou;
    if (ordered){
        thankYou =  <img src={OrderImg} alt="Order Placed"/>
    };

    return (
    
    <Container fluid className="shop-container">
    
        <Row>
            <Col>
                <div className="text-center mt-3 mb-3">
                    {thankYou}
                </div>
            </Col>
        </Row>
         
        <Row className="review-container">
            <Col md={8}>
                <div className="product-container">
                    {
                        cart.map(products => <ReviewItem removeItem = {removeItem} product={products} key={products.key}></ReviewItem>)
                    }
                </div>
            </Col>
            
            <Col md={4}>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button className="order-btn" onClick= {handleProceedCheckout}>Proceed Checkout</button>
                    </Cart>
                </div>
            </Col>
            
        </Row> 
    </Container>
        
    );
};

export default Review;