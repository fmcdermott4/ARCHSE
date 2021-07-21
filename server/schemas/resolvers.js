const { Question, User } = require("../models");

const resolvers = {
  Query: {
    // question: async (parent, { questionId }) => {
    //   return Question.findOne({ _id: questionId });
    // },
    questions: async () => {
      return await Question.find({});
    },    
    // user:  async (parent,{userId}) =>{
    //   return User.findOne({_id: userId})
    // },
    users: async () =>{
      return await User.find({});
    }
  },
};

module.exports = resolvers;
