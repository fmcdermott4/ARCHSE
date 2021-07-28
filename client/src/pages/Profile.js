import React from 'react';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_PROFILE} from '../utils/queries';

import Auth from '../utils/auth';

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
    for(let i = 0; i < questionNum; i++) {
      let questionId = audit.category.questions[i]._id;
      let correctAnswer = audit.category.questions[i].correctAnswer
      for(let z = 0; z < questionNum; z++){
        let answerId = audit.answers[z].question;
        let answer = audit.answers[z].answer;
        if(questionId === answerId && correctAnswer === answer){
          correctAns++;
          console.log(correctAns);
        }
      }
    };
    return(correctAns + "/" + questionNum)
  }
  
  if(loading){
    return(
      <p>Loading...</p>
    )
  } else{
    const profile = data.profile;
    return(    
    <div>     
        <h2>User {profile.name}'s profile page.</h2>
        <p>completed audits</p>
        
        <div>{profile.audits.map((audit)=>{
          return(<p key={audit._id}>{audit.timeSubmitted} {audit.category.category} {auditResult(audit)}</p>)
        })}</div>
    </div>
  )
  }
  
  
  // // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  // const profile = data?.profile || {};
  // if(!loading){
  //   console.log(data)
  // }
  // // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
  //   return <Redirect to="/me" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!profile?.name) {
  //   return (
  //     <h4>
  //       You need to be logged in to see your profile page. Use the navigation
  //       links above to sign up or log in!
  //     </h4>
  //   );
  // }

  // return (
  //   <div>
  //     <h2 className="card-header">
  //       { {profileId} ? `${profile.name}` : 'This person '} has completed the below audits:
  //       {console.log(profile)}
  //     </h2>      
  //   </div>
  // );
};

export default Profile;
