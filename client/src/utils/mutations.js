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
  mutation submitAudit($profile: ID!, $category: ID!, $timeSubmitted: String!, $answers: [AnswerInput], $facility: ID!) {
    submitAudit(profile: $profile, category: $category, timeSubmitted: $timeSubmitted, answers: $answers, facility: $facility){
      _id
    }
  }
`;
export const UPDATE_CERTIFICATION = gql`
  mutation updateCertification($id:ID, $name:String,$validity:String,$additionalData:String){
    updateCertification(id:$id, name:$name, validity:$validity, additionalData:$additionalData){
      _id
      certificationClass
      name
      validity
      additionalData
    }
  }
`

export const CREATE_CERTIFICATION = gql`
  mutation createCertification($name: String, $validity:String, $additionalData:String, $certificationClass:String){
    createCertification(name:$name, validity:$validity, additionalData:$additionalData, certificationClass:$certificationClass){
      _id
      certificationClass
      name
      validity
      additionalData
    }
  }
`;

export const DELETE_CERTIFICATION_BY_ID = gql`
  mutation deleteCertification($id : ID){
    deleteCertification(id:$id){
      _id
    }
  }
`;

export const UPLOAD_SINGLE_FILE = gql`
mutation singleUpload($File: Upload){
  singleUpload(file: $File){
    filename
    mimetype
    encoding
  }
}
`;
