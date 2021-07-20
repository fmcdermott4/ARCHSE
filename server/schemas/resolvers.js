const { Question } = require("../models");

const resolvers = {
  Query: {
    question: async (parent, { questionId }) => {
      return Question.findOne({ _id: questionId });
    },
    questions: async () => {
      return Question.find();
    },
  },
};

module.exports = resolvers;
