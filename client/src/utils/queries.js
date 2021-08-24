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
    access{
      level
      activeUser
    }
    certifications{
      acquired
      valid
      certification{
        _id
        name
        validity
      }      
    }
    audits{
      _id
      category{
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
      timeSubmitted
      facility{
        _id
        facility
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
      access{
        level
        activeUser
      }
      certifications{
        acquired
        valid
        certification{
          _id
          name
          validity
        }      
      }
      audits{
        _id
        category{
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
        timeSubmitted
        facility{
          _id
          facility
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
      access{
        level
        activeUser
      }
      certifications{
        acquired
        valid
        certification{
          _id
          name
          validity
        }      
      }
      audits{
        category{
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
        timeSubmitted
        facility{
          _id
          facility
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
export const QUERY_AUDIT_TYPES = gql`
  query auditTypes{
    auditTypes{
      _id
      auditType
    }
  }
`;
export const QUERY_AUDIT_TYPE = gql`
  query auditType($id : ID!){
    auditType(auditTypeId : $id){
      _id
      auditType    
    }
  }
`;
export const QUERY_CATEGORY_BY_AUDIT_TYPE = gql`
  query categoryByAuditType($auditType : String){
    categoryByAuditType(auditType : $auditType){
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
export const QUERY_CERTIFICATIONS = gql`
  query certifications{
    certifications{
      _id
      certificationClass
      name
      validity
      additionalData
    }
  }
`;
export const QUERY_CERTIFICATIONS_BY_CLASS = gql`
  query certificationByClass($certificationClass : String!){
    certificationByClass(certificationClass: $certificationClass){
      _id
      certificationClass
      name
      validity
      additionalData
    }
  }
`;
export const QUERY_CERTIFICATION = gql`
  query certification($id:ID!){
    certification(certificationId: $id){
      _id
      certificationClass
      name
      validity
      additionalData
    }
  }
`;
export const QUERY_REPORTING_STRUCTURES = gql`
  query reportingStructures{
    reportingStructures{
      _id
      profileId
      manager
      reports
    }
  }
`;
export const QUERY_REPORTING_STRUCTURE = gql`
  query reportingStructure($profileId: ID){
    reportingStructure(profileId:$profileId){
      _id
      profileId
      manager
      reports
    }
  }
`;
export const QUERY_AUDITS_BY_CATEGORY = gql`
  query auditsByCategory($categoryId:ID){
    auditsByCategory(category: $categoryId){
      _id
      profile{
        _id
        name     
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
      facility{
        _id
        facility
      }
      
    }
  }
`;