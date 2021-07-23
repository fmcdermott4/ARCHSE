import React from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { QUERY_CATEGORY } from '../../utils/queries';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";



const IndividualAudit = () => {
    const { categoryId } = useParams();
    const { loading, data } = useQuery(
        QUERY_CATEGORY, 
        {
            variables: { id: categoryId },
        }
    );
    
    let questionsMap = (data) => {
        let questions = data.category.questions.map((question) => {
            console.log(question.answers)
            const block = question.answers.map((answer) =>{      
                return(<option value={answer}>{answer}</option>)
            })
            return(<Form.Group as={Row} className="mb-3">{question.question}<Form.Control as="select"><option>Please select an answer</option>{block}></Form.Control></Form.Group>);
        })
        return(<Form>{questions}</Form>);
    }
    
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