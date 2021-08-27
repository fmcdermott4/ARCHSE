import React from 'react';
import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {QUERY_AUDIT} from '../utils/queries'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const AuditResults = () => {
    const auditId = useParams().auditId;
    const { loading, error, data } = useQuery(
        QUERY_AUDIT,
        {
            variables: {"id": auditId },
        }
    );
    
    
    
    
    const auditMap = (audit) =>{
        let rows = (<Row>
            <Col>
                <h5>Question</h5>
            </Col>                    
            <Col>
                <h5>Answer</h5>
            </Col>
            <Col>
                <h5>Requirement</h5>
            </Col>
        </Row>)

        for(let i = 0; i<audit.category.questions.length; i++){
            console.log(audit)
            rows = (<div>{rows}<Row><Col>{audit.category.questions[i].question}</Col><Col>{audit.answers[i].answer}</Col><Col>{audit.category.questions[i].section}</Col></Row><hr/></div>)
        }
        
        
        return(
            rows
        );       
    };
    


    if(loading){
        return<p>Loading...</p>
    }
    if(error){
        return<p>Not a valid audit</p>
    }    
    return(
        <div>
            <br/>
            <h3>{data.audit.facility.facility}: {data.audit.category.category}</h3>
            <br/>
            
            {auditMap(data.audit)}
            
        </div>
    )    
}

export default AuditResults;