import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const SUBMIT_AUDIT = gql`
  mutation submitAudit($profile: String!, $category: String!, $timeSubmitted: String!, $answers: [String!]) {
    submitAudit(profile: $profile, category: $category, timeSubmitted: $timeSubmitted, answers: $answers){
      _id
    }
  }
`;