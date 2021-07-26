import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { QUERY_CATEGORY} from '../../utils/queries';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Auth from '../../utils/auth';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';





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
        for ( let i = 0; i < data.category.questions.length; i++) {
            let index = data.category.questions[i]._id
            el[index] = '';
        }
        return(el)
        }
    };
    
    const [formState, setFormState] = useState(answersState(loading, data));

    const handleSelect = async (event) => {
        if(!loading){
            const {name, value} = event.target;
            await setFormState({
                ...formState,
                [name]: value,
                profile: myProfileId,
                category: categoryId,
                timeSubmitted: Date(),
            })
        }
        console.log(formState)
    };

    let questionsMap = (loading, data) => {
        if(!loading){
            let questions = data.category.questions.map((question) => {
                const answerBlock = question.answers.map((answer) =>{      
                    // return(<option value={answer} >{answer}</option>)
                    return(<option key={answer} value={answer}>{answer}</option>)
                })
                // return(<Form.Group as={Row} key={question._id} className="mb-3">{question.question}<Select id={question._id} onChange={this.handleSelect} title="name">{answerBlock}</Select><Dropdown.Divider /></Form.Group>);
                return(<Form.Group as={Row} id={question._id} key={question._id} className="mb-3">{question.question}<Form.Control as="select" name={question._id} onChange={handleSelect} defaultValue={question.answers[0]}>{answerBlock}</Form.Control></Form.Group>);
            })
            return(<div><Form>{questions}</Form><div align="center"><Button variant="primary">Submit</Button></div></div>);
        }
    };
    
    return(
        <div>
            {(loading) ?
                (<h2>Loading...</h2>) :
                (<h2>{data.category.category}</h2>            
                )
            }
            {(loading) ? (<div></div>) : (questionsMap(loading, data))}
        </div>
    )

    
    
};

export default IndividualAudit;