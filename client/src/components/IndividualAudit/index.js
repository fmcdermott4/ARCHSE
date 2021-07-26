import React, {useState } from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { QUERY_CATEGORY} from '../../utils/queries';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Auth from '../../utils/auth';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';




const IndividualAudit = () => {
    const { categoryId } = useParams();
    const myProfileId = Auth.getProfile().data._id;
    
    const { loading, data } = useQuery(
        QUERY_CATEGORY, 
        {
            variables: { id: categoryId },
        }
    );
    
    const answersState = (loading, data) =>{
        if(!loading){
        let el = {};
        el.profile = myProfileId;
        el.category = categoryId;
        el.timeSubmitted = new Date();
        el.answeredQuestions = []
        for ( let i = 0; i < data.category.questions.length; i++) {
            let index = data.category.questions[i]._id
            el.answeredQuestions[index] = '';
        }
        el.profile = myProfileId;
        el.category = categoryId;
        return(el)
        }
    };

    const [formState, setFormState] = useState(answersState(loading, data));

    let questionsMap = (data) => {
        let questions = data.category.questions.map((question) => {
            const answerBlock = question.answers.map((answer) =>{      
                return(<Dropdown.Item eventKey={answer}>{answer}</Dropdown.Item>)
                // return(<option key={answer} value={answer}>{answer}</option>)
            })
            return(<Form.Group as={Row} id={question._id} key={question._id} className="mb-3">{question.question}<DropdownButton alignRight title="update me">{answerBlock}</DropdownButton><Dropdown.Divider /></Form.Group>);
            // return(<Form.Group as={Row} id={question._id} key={question._id} className="mb-3">{question.question}<Form.Control as="select"><option>Please select an answer</option>{answerBlock}</Form.Control></Form.Group>);
        })
        return(<div><Form>{questions}</Form><div align="center"><Button variant="primary">Submit</Button></div></div>);
    }

    // let questionsMap = (data) => {
    //     return(<div></div>);
    // }
    
    return(
        <div>
            {(loading) ?
                (<h2>Loading...</h2>) :
                (<h2>{data.category.category}</h2>            
                )
            }
            {(loading) ? (<div></div>) : (questionsMap(data))}
        </div>
    )

    
    
};

export default IndividualAudit;