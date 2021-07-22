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

type User {
    _id: ID
    username: String
    email: String
    password: String
    audits: [String]
}

type Auth {
    token: ID!
    profile: User
}

type Query {
    categories: [Category]
    users: [User]
    user(userId: ID!): User
    categoryById(_id : ID!):Category
    me: User
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;