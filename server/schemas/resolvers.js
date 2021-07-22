const { Category, User} = require("../models");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find({});
    },    
    users: async () =>{
      return await User.find({});
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    categoryById: async(parent, {_id}) =>{
      return await Category.findOne({_id: _id})
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
