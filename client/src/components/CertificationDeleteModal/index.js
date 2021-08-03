import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {DELETE_CERTIFICATION_BY_ID} from '../../utils/mutations';
import {useMutation} from '@apollo/client';
import { useHistory} from 'react-router-dom';


function CertificationDeleteModal(data) {
    console.log(data)
    const history = useHistory();
    const [nameState, setNameState] = useState({
        name : ""
    });
    const [deleteCertification] = useMutation(DELETE_CERTIFICATION_BY_ID);
    
    
    const handleChange = async (event) =>{
        const {name, value} = event.target;
        console.log(name + " " + value)
        await setNameState({
            ...nameState,
            [name] : value,
        })
    };

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        console.log(nameState.name)
        if(nameState.name === data.details.name){
            console.log("trying to delete")
            try{
                await deleteCertification({
                    variables: {id : data.details._id}
                }).then(data.onHide).then(history.go(0))
            }catch(e){
                console.log(e)
            }
        } else{
            alert("Incorrect name input")
        }
    };

    return(
        <Modal
        {...data}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Container key={data.details._id}>
            <br/>
            <Form>
                <Form.Label >To delete, please enter "{data.details.name}" below:</Form.Label>
                <Form.Control type="text" name="name" placeholder={data.details.name} onChange={handleChange}/>
                <br/>        
                <Button onClick={handleDeleteSubmit} variant="secondary">Delete</Button>
            </Form>
            <br/>
        </Container>
      </Modal>
    )
  }
  
  export default CertificationDeleteModal;