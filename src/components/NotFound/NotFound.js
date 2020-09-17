import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './NotFound.css'

const NotFound = () => {
    return (
        <div>
            <Container className="align-content">
                <Row className="text-center">
                 <Col>
                     <h1>Sorry! Page Not Found</h1>
                 </Col>
                </Row>
                <Row className="text-center">
                 <Col>
                     <h2>404 Error!!!</h2>
                 </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NotFound;