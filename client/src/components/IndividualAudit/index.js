import React, { useState } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import { QUERY_CATEGORY, QUERY_FACILITIES} from '../../utils/queries';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Auth from '../../utils/auth';
import {SUBMIT_AUDIT} from "../../utils/mutations";

const IndividualAudit = () => {
    const history = useHistory();
    const now = () => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return(dateTime)
    }
    const { categoryId } = useParams();
    const myProfileId = Auth.getProfile().data._id;
    
    let { loading, data } = useQuery(
        QUERY_CATEGORY, 
        {
            variables: { id: categoryId },
        }
    );
    let categoryData;
    if(!loading){
        categoryData = data;
    }
    const facilitiesData = useQuery(QUERY_FACILITIES).data;
    
    const answersState = (loading, data) =>{        
        let el = {};
        el.facility = "";
        el.profile = myProfileId;
        el.category = categoryId;
        el.answers = [];
        el.timeSubmitted = now();
        return(el)
            };
    
    const [formState, setFormState] = useState(answersState(loading, data));

    const handleSelect = async (event) => {
        if(!loading){
            const {name, value} = event.target;
            if(name === "facility"){
                formState.facility = value
            } else {
                for( let i=0; i < formState.answers.length ; i++){
                if(name === formState.answers[i].question){
                    formState.answers.splice(i,1);
                    } 
                }
                formState.answers.push({question : name , answer : value});
            }
            
            
            await setFormState({
                ...formState,
                profile: myProfileId,
                category: categoryId,
                timeSubmitted: now(),
            });
            
        }
        console.log(formState)
    };
    // define submitAudit
    const [submitAudit, { error }] = useMutation(SUBMIT_AUDIT);
    if(error){
        console.log(error)
    }
    //submit form 
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if((formState.answers.length === data.category.questions.length) &&(formState.facility.length > 0) ){
            try {
                await submitAudit({
                    variables: {...formState},
                })
                .then(alert("Successfully submitted")).then(history.push("/"))
            } catch {
                console.log("error")
            }
        } else {
            if(formState.facility.length > 0){
            alert("Please answer all questions before submitting")
            } else{
                alert("Please input facility for this audit")
            }
        }
    };

    let questionsMap = (loading, data, facilitiesData) => {

        if(!loading){
            let questions = data.category.questions.map((question) => {
                const answerBlock = question.answers.map((answer) =>{      
                    // return(<option value={answer} >{answer}</option>)
                    return(<option key={answer} value={answer}>{answer}</option>)
                })
                // return(<Form.Group as={Row} key={question._id} className="mb-3">{question.question}<Select id={question._id} onChange={this.handleSelect} title="name">{answerBlock}</Select><Dropdown.Divider /></Form.Group>);
                return(<Form.Group as={Row} id={question._id} key={question._id} className="mb-3">{question.question}<Form.Control as="select" name={question._id} onChange={handleSelect} defaultValue=""><option disabled key="" value=""></option>{answerBlock}</Form.Control></Form.Group>);
            });
            return(<div><Form>{questions}</Form><div align="center"><Button variant="primary" onClick={handleFormSubmit}>Submit</Button></div></div>);
        }
    };
    if(loading){
        return<h2>Loading...</h2>
    } else if(typeof(facilitiesData) === 'undefined'){
        return(<h2>Loading...</h2>)
    }else{
        return(
            <div>
                <Row>
                    <Col>
                {(loading) ?
                    (<h2>Loading...</h2>) :
                    (<h2>{categoryData.category.category}</h2>)
                }</Col>
                <Col>
                    <p align="right">
                        Choose Facility:
                    </p>
                </Col>
                <Col>
                    {
                        <Form.Control as="select" name="facility" defaultValue="" onChange={handleSelect}>
                            <option disabled key="" value=""/>
                            {facilitiesData.facilities.map((facility) => {
                                return(<option key={facility.facility} value = {facility._id}>{facility.facility}</option>)
                            })}
                        </Form.Control>
                    }
                </Col>
                </Row>                
                {(loading ) ? (<div></div>) : (questionsMap(loading, categoryData, facilitiesData))}
            </div>
        )
    }
        
    
    // return(
    //     <div>
    //         {(loading) ?
    //             (<h2>Loading...</h2>) :
    //             (<h2>{data.category.category}</h2>            
    //             )
    //         }
    //         {(loading) ? (<div></div>) : (questionsMap(loading, data))}
    //     </div>
    // )

    
    
};

export default IndividualAudit;