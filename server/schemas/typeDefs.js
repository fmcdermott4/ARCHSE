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

type Query {
    categories: [Category]
    users: [User]
    categoryById(_id : ID!):Category
}
`;

module.exports = typeDefs;