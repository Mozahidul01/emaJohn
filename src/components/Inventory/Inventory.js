import React from 'react';
import './Inventory.css'
import { Container, Row, Col } from 'react-bootstrap';

const Inventory = () => {
    return (
        <div>
            <Container className="content">
                <Row className="text-center">
                    <Col>
                        <h1>Inventory Coming Soon...</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Inventory;