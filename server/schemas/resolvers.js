const { Category, Profile, Audit} = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find({}).populate("questions").populate({path:"audits", populate:"category"});
    },        
    category: async(parent, {categoryId}) =>{
      return await Category.findOne({_id: categoryId}).populate("questions").populate({path:"audits", populate:"category"});
    },
    profiles: async () => {
      return Profile.find().populate("audits");
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate("audits");
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    audits: async () => {
      return await Audit.find({}).populate("category").populate("profile");
    },
    audit: async (parent, {auditId}) => {
      return await Audit.findOne({_id: auditId}).populate("category").populate("profile");
    }

  },
  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    submitAudit: async (parent, {profile, category, timeSubmitted, answers}) => {
      const audit = await Audit.create({profile, category, timeSubmitted, answers});
      const updateProfile = await Profile.findOneAndUpdate({_id: profile}, {$push: {audits: audit._id}})
      return(updateProfile);
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
