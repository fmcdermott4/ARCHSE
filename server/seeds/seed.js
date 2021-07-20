const db = require('../config/connection');
const { Question } = require('../models');
const questionSeeds = require('./questionSeeds.json');

db.once('open', async () =>{
    try{
        await Question.deleteMany({});
        await Question.create(questionSeeds);

        console.log("Successfully seeded!");
        process.exit(0);
    } catch(err){
        throw err
    }
});