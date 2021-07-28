const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Profile {
    _id: ID
    name: String
    email: String
    password: String
    audits: [Audit]
}
type Audit {
    _id: ID
    profile: Profile
    category: Category
    timeSubmitted: String
    answers: [AnsweredQuestion]
}
type Category {
    _id: ID
    category: String
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
    profiles: [Profile]
    profile(profileId: ID!): Profile
    me: Profile
    audits: [Audit]
    audit(auditId: ID!): Audit
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    submitAudit(profile: ID!, category: ID!, timeSubmitted: String!, answers: [AnswerInput]): Audit
}`;

module.exports = typeDefs;