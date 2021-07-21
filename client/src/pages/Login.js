import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Login = () => {
    return(
        <Container className="d-flex flex-row">
            <Col className="d-flex flex-column">
            <Form >
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                    Email
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control type="email" defaultValue="email@example.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                    Password
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <Container className="d-flex justify-content-center">
                    <Button variant="success">Submit</Button>{' '}
                </Container>
                </Form>
            </Col>

        </Container>
    )
};

export default Login;