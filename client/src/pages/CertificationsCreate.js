import React, {useState} from 'react';
import {QUERY_CERTIFICATIONS, QUERY_CERTIFICATIONS_BY_CLASS} from '../utils/queries';
import {useQuery} from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const CertificationsCreate = () => {

    const {loading, data } = useQuery(QUERY_CERTIFICATIONS)
    
    const [selected, setSelected] = useState("Safety");
    const handleChange = (event) => { 
        setSelected(event.target.value)    
    }
    const myCategories = (data) =>{
        let array = [];
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        };    
        for (let i = 0; i < data.certifications.length; i++){
            array.push(data.certifications[i].class)
        };
        return(array.filter(unique))
    };
    
    const button = (data) =>{ 
        
        data.map((el)=>{
            return<option key={el} value={el}>{el}</option>
        })
        return(<Form><Form.Label>Category</Form.Label><Form.Control as="select" defaultValue="Data" onChange={handleChange}>{data.map((el)=>{
            return<option key={el} value={el}>{el}</option>
        })}<option key="New" value="New">New</option></Form.Control></Form>)
    }
    
    if(loading){
        return<div>Loading...</div>
    }
        return(
            <div>
                <Form>
                    <h3>Create new certification</h3>
                    <hr/>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" name="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Certification Name" />
                            </Form.Group>
                        </Col>
                        <Col/>
                    </Row>           
                    
                    <Row>
                        <Col>{button(myCategories(data))}</Col>
                        <Col />
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" name="validity">
                                <Form.Label>Validity in days</Form.Label>
                                <Form.Control type="text" defaultValue="180" />
                            </Form.Group>
                        </Col>
                        <Col/>
                    </Row>
                    <br/>
                    <Row>       
                        <Form.Group className="mb-3" name="additionalData">
                            <Form.Label>Additional Information</Form.Label>
                            <Form.Control as="textarea" rows={8} placeholder="Additional information for the certification"/>
                        </Form.Group>
                    </Row>
                    <div align="center">
                        <Button  variant="primary" type="submit">
                            Submit
                        </Button>
                    </div> 
                </Form>
            </div>
        )
            
        
    }

export default CertificationsCreate;