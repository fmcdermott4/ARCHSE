const { Category, Profile, Audit, Facility, AuditType} = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find({}).populate("questions");
    },        
    category: async(parent, {categoryId}) =>{
      return await Category.findOne({_id: categoryId}).populate("questions");
    },
    categoryByAuditType: async (parent, {auditType}) => {
      return await Category.find({auditType: auditType}).populate("questions");
    },
    profiles: async () => {
      return Profile.find().populate("audits").populate({path:"audits", populate:"category facility"});
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate("audits").populate({path:"audits", populate:"category facility"});
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    audits: async () => {
      return await Audit.find({}).populate("profile category facility");
    },
    audit: async (parent, {auditId}) => {
      return await Audit.findOne({_id: auditId}).populate("profile category facility");
    },
    facilities: async () => {
      return await Facility.find({});
    },
    auditTypes: async () => {
      return await AuditType.find({});
    },
    auditType: async (parent, {auditTypeId}) =>{
      return await AuditType.findOne({_id: auditTypeId});
    }

  },
  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    submitAudit: async (parent, {profile, category, timeSubmitted, answers, facility}) => {
      const audit = await Audit.create({profile, category, timeSubmitted, answers, facility});
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
