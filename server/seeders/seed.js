const db = require('../config/connection');
const { Profile, Category} = require('../models');
const questionSeeds = require('./questionSeeds.json');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () =>{
    try{
        await Category.deleteMany({});
        await Category.create(questionSeeds);
        await Profile.deleteMany({});
        await Profile.create(profileSeeds);

        console.log("Successfully seeded!");
        process.exit(0);
    } catch(err){
        throw err
    }
});