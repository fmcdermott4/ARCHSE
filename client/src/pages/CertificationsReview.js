import React, {useState} from 'react';
import {QUERY_CERTIFICATIONS, QUERY_CERTIFICATION,QUERY_CERTIFICATIONS_BY_CLASS} from '../utils/queries';
import {useQuery, useMutation} from '@apollo/client';
import Form from 'react-bootstrap/Form';

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
        <p>Certifications Review</p>
        {button(myCategories(data))}
        </div>
    )
        
    
}

export default CertificationsReview;