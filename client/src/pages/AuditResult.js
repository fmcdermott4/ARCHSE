import React from 'react';
import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {QUERY_AUDIT} from '../utils/queries'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const AuditResults = () => {
    const auditId = useParams().auditId;
    const { loading, data } = useQuery(
        QUERY_AUDIT,
        {
            variables: {"id": auditId },
        }
    );
    
    
    
    
    const auditMap = (audit) =>{
        console.log(audit)
        console.log(audit.category.questions)
        
        
        return(<div></div>);
        
    }
    


    if(loading){
        return<p>Loading...</p>
    }    
    return(
        <div>
            
            <h3>{data.audit.facility.facility}: {data.audit.category.category}</h3>
            <br/>
            <Row>
                <Col>
                    <h5>Question</h5>
                </Col>                    
                <Col>
                <h5>Answer</h5>
                </Col>
            </Row>
            {auditMap(data.audit)}
            
        </div>
    )    
}

export default AuditResults;