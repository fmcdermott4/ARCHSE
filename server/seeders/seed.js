const db = require('../config/connection');
const { Profile, Category, Audit, Facility, AuditType, UserStatus, Certification} = require('../models');
const questionSeeds = require('./questionSeeds.json');
const profileSeeds = require('./profileSeeds.json');
const auditSeeds = require('./auditSeeds.json');
const facilitySeeds = require('./facilitySeeds.json');
const auditTypeSeeds = require('./auditTypeSeeds.json');
const userStatusSeeds = require('./userStatusesSeeds.json');
const certificationSeeds = require('./certificationsSeeds.json');

db.once('open', async () =>{
    try{
        // await Category.deleteMany({});
        // await Category.create(questionSeeds);
        // await Profile.deleteMany({});
        // await Profile.create(profileSeeds);
        // await Audit.deleteMany({});
        // await Audit.create(auditSeeds);
        // await Facility.deleteMany({});
        // await Facility.create(facilitySeeds);
        // await AuditType.deleteMany({});
        // await AuditType.create(auditTypeSeeds);
        // await UserStatus.deleteMany({});
        // await UserStatus.create(userStatusSeeds);
        await Certification.deleteMany({});
        await Certification.create(certificationSeeds);

        console.log("Successfully seeded!");
        process.exit(0);
    } catch(err){
        throw err
    }
});