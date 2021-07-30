import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function MyVerticallyCenteredModal(props) {
  const stopProp = (e) => {
      e.stopPropagation();
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container>
        <Form>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={props.details.name}/>
          <Form.Label>Validity (days)</Form.Label>
          <Form.Control type="integer" defaultValue={props.details.validity}/>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" as="textarea" defaultValue={props.details.additionalData}/>
        </Form>
        
        <Modal.Footer onClick={stopProp}>
          <Button>Update</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Container>
      </Modal>
    );
  }
  
  function CertificationModal(certification) {
    const [modalShow, setModalShow] = React.useState(false);
  
    return(
      <div>
        <a key={certification.certification._id} data-toggle="modal" href="#" onClick={() => setModalShow(true)}>
            <Row >
                <Col xs={3}>
                    <p>{certification.certification.name}</p>
                </Col>
                <Col xs={3}>
                    <p>{certification.certification.validity}</p>
                </Col>
                <Col xs={6}>
                    <p>{certification.certification.additionalData}</p>
                </Col>
            </Row>
            <MyVerticallyCenteredModal 
            show={modalShow} details={certification.certification}
            onHide={() => setModalShow(false)}
          />
            <hr/>
        </a>
      </div>
  )
    // return (
    //   <>
    //     <Button variant="primary" onClick={() => setModalShow(true)}>
    //       Launch vertically centered modal
    //     </Button>
  
    //     <MyVerticallyCenteredModal
    //       show={modalShow}
    //       onHide={() => setModalShow(false)}
    //     />
    //   </>
    // );
  }
  
  export default CertificationModal;