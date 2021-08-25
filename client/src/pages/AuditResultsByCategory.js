import react from 'react';
import {useParams, Link} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {QUERY_AUDITS_BY_CATEGORY} from '../utils/queries'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const AuditResultsByCategory = () =>{
    const auditCategory = useParams().categoryId;
    const { loading, error, data } = useQuery(
        QUERY_AUDITS_BY_CATEGORY,
        {
            variables: {"categoryId": auditCategory },
        }
    );
    
    const auditResult = (audit) => {
        console.log(audit);
        const questionNum = audit.category.questions.length;
        let correctAns = 0;
        let nA = 0;
        for(let z = 0; z < questionNum; z++){
            let answer = audit.answers[z].answer;
            if(answer === "n/a"){
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
                <h4>Auditor</h4>
            </Col>
            <Col>
              <h4>Audit Result</h4>
            </Col>
            <hr/>
          </Row>
        {data.auditsByCategory.map((audit)=>{
            return(
                <Row key={audit._id}>
                <Col>
                    <p>{audit.facility.facility}</p>
                </Col>
                <Col>
                    <p>{audit.timeSubmitted}</p>
                </Col>
                <Col>
                    <p>{audit.profile.name}</p>
                </Col>
                <Col>
                    <Link to={"/auditresults/"+audit._id}>{auditResult(audit)}</Link>
                </Col>
                <hr/>
                </Row>
            )  
            }).reverse()
        }
    </div>
    )

}

export default AuditResultsByCategory;