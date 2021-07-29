import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
  query categories{
    categories{
      _id
      category
      auditType
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
export const QUERY_CATEGORY = gql`
  query category($id : ID!){
    category(categoryId : $id){
      _id
      category
      auditType
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
  query profiles{
    profiles{
      _id
      name
      email
      audits{
        _id
        timeSubmitted
        facility{
          _id
          facility
        }
        category{
          _id
          category
          auditType
          questions{
            _id
            section
            question
            correctAnswer
          }
        }
        answers{
          _id
          question
          answer
        }
      }
    }
  }
`;
export const QUERY_SINGLE_PROFILE = gql`
  query profile($id: ID!){
    profile(profileId: $id){
      _id
      name
      email
      audits{
        _id
        timeSubmitted
        facility{
          _id
          facility
        }
        category{
          _id
          category
          auditType
          questions{
            _id
            section
            question
            correctAnswer
          }
        }
        answers{
          _id
          question
          answer
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      audits{
        _id
      }
    }
  }
`;

export const QUERY_AUDITS = gql`
  query audits{
    audits{
      _id
      facility{
        _id
        facility
      }
      profile{
        _id
        name
        email      
      }
      category{
        _id
        category
        auditType
        questions{
          _id
          section
          question
          correctAnswer        
        }        
      }
      timeSubmitted
      answers{
        _id
        question
        answer
      }
    }
}
`;

export const QUERY_AUDIT = gql`
  query audit($id : ID!){
    audit(auditId: $id){
    _id
    facility{
      _id
      facility
    }
      profile{
        _id
        name
        email      
      }
      category{
        _id
        category
        auditType
        questions{
          _id
          section
          question
          correctAnswer        
        }      
      }
      timeSubmitted
      answers{
        _id
        question
        answer
      }      
    }
  }
`;

export const QUERY_FACILITIES = gql`
  query facilities{
    facilities{
      _id
      facility
    }
  }
`;