const { Category, User} = require("../models");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find({});
    },    
    users: async () =>{
      return await User.find({});
    },
    categoryById: async(parent, {_id}) =>{
      return await Category.findOne({_id: _id})
    }
  }
};

module.exports = resolvers;
