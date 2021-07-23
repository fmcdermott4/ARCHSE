const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Question {
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
type Query {
    categories:[Category]
    category(categoryId: ID!): Category
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
}`;

module.exports = typeDefs;