import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {UPDATE_CERTIFICATION} from '../../utils/mutations';
import {useMutation} from '@apollo/client';
import { useHistory} from 'react-router-dom';
import CertificationDeleteModal from '../CertificationDeleteModal';


function MyVerticallyCenteredModal(props) {
  const history = useHistory();
  const stopProp = (e) => {
      e.stopPropagation();
    }
    const [setCert] = useMutation(UPDATE_CERTIFICATION);
  const [formState, setFormState] = useState(
    {
      id : props.details._id,
      name : props.details.name,
      validity : props.details.validity,
      additionalData : props.details.additionalData
    }
  );

  const handleChange = async (event) => {
    const {name, value} = event.target;
    await setFormState({
      ...formState,
      [name]: value,
    }
    )
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try{
      await setCert({
        variables: { ...formState},
      }).then(props.onHide).then(history.go(0))
    }catch(error){
      console.log(error)
    }
    
  };  


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container>
        <Form key={props.details._id}>
          <Form.Label >Name</Form.Label>
          <Form.Control type="text" name="name" defaultValue={props.details.name} onChange={handleChange}/>
          <Form.Label>Validity (days)</Form.Label>
          <Form.Control type="test" name="validity" defaultValue={props.details.validity} onChange={handleChange}/>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" as="textarea" name="additionalData" defaultValue={props.details.additionalData} onChange={handleChange}/>
        </Form>
        
        <Modal.Footer onClick={stopProp}>
          <Button onClick={handleFormSubmit}>Update</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Container>
      </Modal>
    );
  }
  
  function CertificationModal(certification) {
    const [modalShow, setModalShow] = React.useState(false);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  
    return(
      <div>
          <Row >
            <Col xs={11}>
              <a key={certification.certification._id} data-toggle="modal" href="#" onClick={() => setModalShow(true)}>
                <Row>
                  <Col xs={6} md={3}>
                      <p>{certification.certification.name}</p>
                  </Col>
                  <Col xs={6} md={2}>
                      <p>{certification.certification.validity} days</p>
                  </Col>
                  <Col xs="auto" md={7}>
                      <p style={{'overFlowWrap' : 'break-word'}}>{certification.certification.additionalData}</p>
                  </Col>
                  </Row>
              </a>
            </Col>  
            <Col xs={1}>
              <Button variant="secondary" onClick={() => setDeleteModalShow(true)}>Delete</Button>
            </Col>
          </Row>            
            <MyVerticallyCenteredModal 
            show={modalShow} details={certification.certification}
            onHide={() => setModalShow(false)}
            />       
          <CertificationDeleteModal 
            show={deleteModalShow} details={certification.certification} 
            onHide={() => setDeleteModalShow(false)}/>
            <hr/>
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