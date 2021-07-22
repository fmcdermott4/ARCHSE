const db = require('../config/connection');
const { User, Category} = require('../models');
const questionSeeds = require('./questionSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () =>{
    try{
        await Category.deleteMany({});
        await User.deleteMany({});
        await Category.create(questionSeeds);
        await User.create(userSeeds);

        console.log("Successfully seeded!");
        process.exit(0);
    } catch(err){
        throw err
    }
});