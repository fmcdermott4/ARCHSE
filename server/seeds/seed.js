const db = require('../config/connection');
const { Question } = require('../models');
const { User } = require('../models');
const questionSeeds = require('./questionSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () =>{
    try{
        await Question.deleteMany({});
        await User.deleteMany({});
        await Question.create(questionSeeds);
        await User.create(userSeeds);

        console.log("Successfully seeded!");
        process.exit(0);
    } catch(err){
        throw err
    }
});