import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import './Shop.css';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import {getDatabaseCart, addToDatabaseCart} from '../../utilities/databaseManager'

const Shop = () => {
    const productData = fakeData.slice(0,10);
    const [products, setProducts] = useState(productData);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find( product => product.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        
        setCart(previousCart);
        
    },[])

    const handleCart = (product) => {
        const sameProduct = cart.find(products => products.key === product.key);
        
        let count = 1;
        let newCart;
        
        if (sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(products => products.key !== product.key);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    } 

    return (
        <Container fluid className="shop-container">
            <Row>
            
                <Col md={8}>
                    <div className="product-container">
                    {
                        products.map(product => 
                        <Product 
                        product={product} 
                        key={product.key} 
                        handleCart={handleCart} 
                        showAddToCart={true}>
                        </Product>)
                    }
                    </div>
                </Col>
                
                <Col md={4}>
                    <div className="cart-container">
                        <Cart cart={cart} >
                            <Link to="/review"><button className="order-btn"> Review Order</button></Link>
                        </Cart>
                    </div>
                </Col>
                
            </Row> 
        </Container>
        
    );
};
export default Shop;





























