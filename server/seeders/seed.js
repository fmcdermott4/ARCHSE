const db = require('../config/connection');
const { Profile, Category, Audit} = require('../models');
const questionSeeds = require('./questionSeeds.json');
const profileSeeds = require('./profileSeeds.json');
const auditSeeds = require('./auditSeeds.json');

db.once('open', async () =>{
    try{
        await Category.deleteMany({});
        await Category.create(questionSeeds);
        await Profile.deleteMany({});
        await Profile.create(profileSeeds);
        await Audit.deleteMany({});
        await Audit.create(auditSeeds);

        console.log("Successfully seeded!");
        process.exit(0);
    } catch(err){
        throw err
    }
});