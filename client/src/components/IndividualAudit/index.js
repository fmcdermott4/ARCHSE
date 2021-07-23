import React from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { QUERY_CATEGORY } from '../../utils/queries';

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
            console.log(question.question)
            return(<p>{question.question}</p>)
        })
        return(questions);
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