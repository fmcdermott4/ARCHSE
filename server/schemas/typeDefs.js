const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Question {
    _id: ID
    section: String
    question: String
    correctAnswer: String
    answers: [String]
}
type Category {
    _id: ID
    category: String
    questions: [Question]
}
type Profile {
    _id: ID
    name: String
    email: String
    password: String
    audits: [String]!
}
type Auth {
    token: ID!
    profile: Profile
}
type Audit {
    _id: ID
    profile: String
    category: String
    timeSubmitted: String
    answers: [AnsweredQuestions]
}
type AnsweredQuestions {
    _id: ID
    question: String
    answer: String
}
type Query {
    categories:[Category]
    category(categoryId: ID!): Category
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    audit: Audit
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    submitAudit(profile: ID!, category: String!, timeSubmitted: String!, answers: [String]!): Audit
}`;

module.exports = typeDefs;