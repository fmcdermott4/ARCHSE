import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
query categories{
  categories{
    _id
    category
    questions{
      section
      question
      answers
      correctAnswer
    }
  }
}
`;

export const QUERY_CATEGORY = gql`
query category($id : ID!){
  category(categoryId : $id){
    _id
    category
    questions{
      _id
      section
      question
      correctAnswer
      answers
    }
  }
}
`;

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      audits
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
query profile($id : ID!){
  profile(profileId : $id){
    _id
    name
    email
    audits
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      audits
    }
  }
`;
