import React from 'react';
import {Link} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {QUERY_AUDITS, QUERY_FACILITIES} from '../utils/queries'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

const AuditResultsAll = () =>{
    const { loading, error, data } = useQuery(QUERY_AUDITS);
    
    
    const auditResult = (audit) => {
        
        const questionNum = audit.category.questions.length;
        let correctAns = 0;
        let nA = 0;
        for(let z = 0; z < questionNum; z++){
            let answer = audit.answers[z].answer;
            if(answer === "n/a"|| answer === 'N/A'){
            nA++;
            }
        }  
        for(let i = 0; i < questionNum; i++) {
            let questionId = audit.category.questions[i]._id;
            let correctAnswer = audit.category.questions[i].correctAnswer
            for(let z = 0; z < questionNum; z++){
                let answerId = audit.answers[z].question;
                let answer = audit.answers[z].answer;
                if(questionId === answerId && correctAnswer === answer){
                correctAns++;
                }
            }      
        };
        return(correctAns + "/" + (questionNum - nA))
    }
    
    
    
    
    
    if(loading){
        return<div>Loading...</div>
    }
    if(error){
        return<div>Invalid audit</div>
    }
    return(
    <div>
        <Row>
            <Col>
                <h4>Audit Location</h4>
            </Col>
            <Col>
                <h4>Date Conducted</h4>
            </Col>
            <Col>
                <h4>Audit Category</h4>
            </Col>
            <Col>
               <h4>Audit Result</h4>
            </Col>
            
        </Row>
        <Row>
            <Col>
        <Facilities />
            </Col>
            <Col />
            <Col />
            <Col />
        </Row>
        <hr/>
        {data.audits.map((audit)=>{
            return(
                <Row key={audit._id}>
                <Col>
                    <p>{audit.facility.facility}</p>
                </Col>
                <Col>
                    <p>{audit.timeSubmitted}</p>
                </Col>
                <Col>
                    <p>{audit.category.category}</p>
                </Col>
                <Col>
                    <Link to={"/audits/auditresults/"+audit._id}>{auditResult(audit)}</Link>
                </Col>
                <hr/>
                </Row>
            )  
            }).reverse()
        }
    </div>
    )

}

const Facilities = () =>{
    const {loading, error, data} = useQuery(QUERY_FACILITIES);
    
    const facilitiesButton = (facilities) =>{        
        return(
            <Form>
                <Form.Control as="select" >
                    {facilities.map((facility)=>{                    
                        return(
                            <option key={facility.facility} value={facility._id}>
                                {facility.facility}
                            </option>)
                        })
                    }
                </Form.Control>
            </Form>
        )
    }

    if(loading){
        return(<div>Loading...</div>)
    }
    if(error){
        return(<div>Error...</div>)
    }
    return(
        <div>
            {facilitiesButton(data.facilities)}
        </div>
    )
}

export default AuditResultsAll;