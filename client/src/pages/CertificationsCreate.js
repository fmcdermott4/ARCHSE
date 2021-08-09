import React, {useState} from 'react';
import {QUERY_CERTIFICATIONS} from '../utils/queries';
import {useQuery, useMutation} from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {CREATE_CERTIFICATION} from '../utils/mutations';
import { useHistory} from 'react-router-dom';



const CertificationsCreate = () => {
    const history = useHistory();

    const {loading, data } = useQuery(QUERY_CERTIFICATIONS)

    const [selected, setSelected] = useState({
        name: "",
        validity: "180",
        additionalData: "",
        certificationClass: "New"
    });
    
    const handleChange = async (event) => { 
        

        const {name, value} = event.target;
        await setSelected({
            ...selected,
            [name] : value
        })
        console.log(selected)
    }
    const myCategories = (data) =>{
        let array = [];
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        };    
        for (let i = 0; i < data.certifications.length; i++){
            array.push(data.certifications[i].certificationClass)
        };
        return(array.filter(unique))
    };
        
    const button = (data) =>{ 
        data.map((el)=>{
            
            return<option key={el} value={el}>{el}</option>
        })
        return(<Form.Group><Form.Group>Select Category</Form.Group><Form.Control as="select" name="certificationClass" defaultValue="Data" onChange={handleChange}><option key="New" value="New">New</option>{data.map((el)=>{
            return<option key={el} value={el}>{el}</option>
        })}</Form.Control></Form.Group>)
    };

    const [submitCertification, {error}] = useMutation(CREATE_CERTIFICATION);

    const handleFormSubmit = async (event) =>{
        event.preventDefault();
        selected.validity=parseInt(selected.validity).toString();
        while(selected.certificationClass === "New" || selected.certificationClass === ""){
            console.log(selected.certificationClass.length)
            selected.certificationClass = prompt("What is your new  certification category called?")
        }
        while(selected.name === ""){
            selected.name = prompt("What is the name of your new certification?")
        }
        while(isNaN(selected.validity) || selected.validity === "" || selected.validity < 1){
            console.log(selected.validity)
            selected.validity = prompt("What is your certification validity in days?")
        }
        try{
            await submitCertification({
                variables: {...selected},
            })
            .then(alert("Successfully submitted")).then(history.go(0))
        } catch {
            console.log(error)
        }
        
        
    }
;
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
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" onChange={handleChange} placeholder="Certification Name" />
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
                            <Form.Group className="mb-3" >
                                <Form.Label>Validity in days</Form.Label>
                                <Form.Control type="text" name="validity" onChange={handleChange} defaultValue="180" />
                            </Form.Group>
                        </Col>
                        <Col/>
                    </Row>
                    <br/>
                    <Row>       
                        <Form.Group className="mb-3" >
                            <Form.Label>Additional Information</Form.Label>
                            <Form.Control as="textarea" rows={8} name="additionalData" onChange={handleChange} placeholder="Additional information for the certification"/>
                        </Form.Group>
                    </Row>
                    <div align="center">
                        <Button onClick={handleFormSubmit} variant="primary" type="submit">
                            Submit
                        </Button>
                    </div> 
                </Form>
            </div>
        )
            
        
    }

export default CertificationsCreate;