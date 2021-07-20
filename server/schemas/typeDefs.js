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
type Query {
    questions: [Question]!
    question(questionId: ID!): Question
}
`;

module.exports = typeDefs;



