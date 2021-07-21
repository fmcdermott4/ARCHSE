const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Question {
    _id: ID
    category: String
    section: String
    question: String
    correctAnswer: String
    answers: [String]
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    audits: [String]
}

type Query {
    questions: [Question]
    users: [User]
}
`;

module.exports = typeDefs;