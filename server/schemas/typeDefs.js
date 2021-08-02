const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Profile {
    _id: ID
    name: String
    email: String
    password: String
    access: Access
    certifications:[individualCertification]
    audits: [Audit]
}
type individualCertification {
    certification: Certification
        acquired: String
        valid: Boolean
}
type Access {
    level: String
    activeUser: Boolean
}
type Certification {
    _id:ID
    class: String
    name: String
    validity: String
    additionalData: String
}
type Audit {
    _id: ID
    profile: Profile
    category: Category
    timeSubmitted: String
    answers: [AnsweredQuestion]
    facility: Facility
}
type Category {
    _id: ID
    category: String
    auditType: String
    questions: [Question]
}
type Question {
    _id: ID
    section: String
    question: String
    correctAnswer: String
    answers: [String]
}
type AnsweredQuestion {
    _id: ID
    question: String
    answer: String
}
type Facility {
    _id: ID
    facility: String
}
type AuditType {
    _id: ID
    auditType: String
}

type Auth {
    token: ID!
    profile: Profile
}

input AnswerInput {
    _id: ID
    question: String
    answer: String
}

type Query {
    categories:[Category]
    category(categoryId: ID!): Category
    categoryByAuditType(auditType: String): [Category]
    profiles: [Profile]
    profile(profileId: ID!): Profile
    me: Profile
    audits: [Audit]
    audit(auditId: ID!): Audit
    facilities:[Facility]
    auditTypes:[AuditType]
    auditType(auditTypeId: ID!): AuditType
    certifications:[Certification]
    certificationByClass(certificationClass: String!): [Certification]
    certification(certificationId: ID!): Certification
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    submitAudit(profile: ID!, category: ID!, timeSubmitted: String!, answers: [AnswerInput], facility: ID!): Audit
    updateCertification(id: ID, name: String, validity: String, additionalData: String): Certification
}`;

module.exports = typeDefs;