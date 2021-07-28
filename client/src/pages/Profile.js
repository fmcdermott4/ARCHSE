import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { QUERY_SINGLE_PROFILE} from '../utils/queries';

const Profile = () => {
  const profileId = useParams().userId;
  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    QUERY_SINGLE_PROFILE,
    {
      variables: {id: profileId },
    }
  );
  const auditResult = (audit) => {
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
    return(
      <p>Loading...</p>
    )
  } else{
    const profile = data.profile;
    
    return(    
    <div>     
        <h2>{profile.name}'s profile page.</h2>
        <br/><br/>
        <Container>
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
            <hr/>
          </Row>
          {profile.audits.map((audit) =>{
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
                  <p>{auditResult(audit)}</p>
                </Col>
                <hr/>
              </Row>
            )  
          })}             
        </Container>
    </div>
  )
  }  
};

export default Profile;
