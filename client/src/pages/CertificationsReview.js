import React, {useState} from 'react';
import {QUERY_CERTIFICATIONS, QUERY_CERTIFICATIONS_BY_CLASS} from '../utils/queries';
import {useQuery} from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CertificationModal from '../components/CertificationUpdateModal'

const CertificationsReview = () => {

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

// const button = (data) =>{    
//     const selectButton = (data) =>{
//         return(data.certifications.map((data) =>{             
//             return(<option key={data.class} value={data.class}>{data.class}</option>)
//             }
//         ))
//     };    
//     return(<Form><Form.Label>Select Category</Form.Label><Form.Control as="select" defaultValue="Data" onChange={handleChange}>{selectButton(data)}</Form.Control></Form>)
// }
const button = (data) =>{ 
    
    data.map((el)=>{
        return<option key={el} value={el}>{el}</option>
    })
    return(<Form><Form.Label>Select Category</Form.Label><Form.Control as="select" defaultValue="Data" onChange={handleChange}>{data.map((el)=>{
        return<option key={el} value={el}>{el}</option>
    })}</Form.Control></Form>)
}

if(loading){
    return<div>Loading...</div>
}
    return(<div>        
        {button(myCategories(data))}
        <AvailableTrainings category={selected} /> 
        </div>
    )
        
    
}

const AvailableTrainings = (selected) => {

    const {loading, data } = useQuery(
        QUERY_CERTIFICATIONS_BY_CLASS,
        {
            variables: { certificationClass: selected.category}
        }
    )
    const classDisplay = (certificationArray) =>{
        const certificationArrayMap = (certificationArray) => certificationArray.map((certification)=>{
            return(<CertificationModal  key={certification._id} certification={certification}/>)
            // return(<CertificationModal />)
            // return(
            //     <a key={certification._id} data-toggle="modal" href="#myModal">
            //         <Row >
            //             <Col xs={3}>
            //                 <p>{certification.name}</p>
            //             </Col>
            //             <Col xs={3}>
            //                 <p>{certification.validity}</p>
            //             </Col>
            //             <Col xs={6}>
            //                 <p>{certification.additionalData}</p>
            //             </Col>
            //         </Row>
            //         <hr/>
            //     </a>
            // )
        })
        return(
        <Container>
            <Row key="header">
                <Col xs={3}>
                    <h4>Name</h4>
                </Col>
                <Col xs={3}>
                    <h4>Validity</h4>
                </Col>
                <Col xs={6}>
                    <h4>Description</h4>
                </Col>
            </Row>
            <hr/>
            {certificationArrayMap(certificationArray)}
        </Container>)
    };

    if(loading){
        return<div>Loading...</div>
    }
    return(
        <div>
            <hr/>
            {classDisplay(data.certificationByClass)}
        </div>
    )

}

export default CertificationsReview;