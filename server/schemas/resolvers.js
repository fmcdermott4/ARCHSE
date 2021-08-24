const { Category, Profile, Audit, Facility, AuditType, Certification, ReportingStructure, File} = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { GraphQLUpload } = require('graphql-upload');

const resolvers = {
  Upload: GraphQLUpload,
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
    },
    certifications: async() =>{
      return await Certification.find({})
    },
    certification: async(parent, {certificationId})=>{
      return await Certification.findOne({_id: certificationId})
    },
    certificationByClass: async(parent, {certificationClass}) =>{
      return await Certification.find({certificationClass: certificationClass});
    },
    reportingStructures: async () =>{
      return await ReportingStructure.find({})
    },
    reportingStructure: async (parent, {profileId})=>{
      return await ReportingStructure.find({profileId: profileId})
    },
    auditsByCategory: async (parent, {category})=>{
      return await Audit.find({category: category}).populate('profile category facility ')
    },
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
    },
    updateCertification: async (parent, {id, name, validity, additionalData}) =>{
      const updatedCert = await Certification.findByIdAndUpdate(id, {name, validity, additionalData});
            return(updatedCert);
    },
    createCertification: async (parent,{name, validity, additionalData, certificationClass}) =>{
      const createCert = await Certification.create({name, validity, additionalData, certificationClass});
      return(createCert);
    },
    deleteCertification: async (parent, {id}) => {
      const deleteCert = await Certification.findByIdAndDelete({_id: id});
      return(deleteCert)
    },
    singleUpload: async (parent, { file }) => {
      console.log(file)
      const { filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      // const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      // const out = require('fs').createWriteStream('local-file-output.txt');
      // stream.pipe(out);
      // await finished(out);

      return { filename, mimetype, encoding };






      // const Grid = require('gridfs-stream');
      // const fs = require('fs');
      // const conn = require('../config/connection');
      // const mongoose = require('mongoose');
      
      // Grid.mongo = mongoose.mongo;
    
      // conn.once('open', (file) =>{
      //   console.log("gridfs connetion open");
      //   console.log(file);
      //   const gfs = Grid(conn.db);
      //   const writeStream = gfs.createWriteStream({
         
      //     filename: 'myVideo-db.mp4'
      //   });
      //   fs.createReadStream(file).pipe(writeStream)
      //   writeStream.on('close', (upload) => {
      //     // Do something with 'file'
      //     // Console logging that it was written succesfully
      //     console.log(`${upload.filename} was written to DB`);
      //   return(upload)
      //   });      
      // })          
    }  
  }
};

module.exports = resolvers;
