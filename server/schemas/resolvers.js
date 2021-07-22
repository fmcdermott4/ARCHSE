const { Category, User} = require("../models");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find({});
    },    
    users: async () =>{
      return await User.find({});
    }
  }
};

module.exports = resolvers;
