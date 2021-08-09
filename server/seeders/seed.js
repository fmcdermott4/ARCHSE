const db = require('../config/connection');
const { Profile, Category, Audit, Facility, AuditType, UserStatus, Certification, ReportingStructure} = require('../models');
const questionSeeds = require('./productionQuestionSeeds.json');
const profileSeeds = require('./profileSeeds.json');
const auditSeeds = require('./auditSeeds.json');
const facilitySeeds = require('./facilitySeeds.json');
const auditTypeSeeds = require('./auditTypeSeeds.json');
const userStatusSeeds = require('./userStatusesSeeds.json');
const certificationSeeds = require('./certificationsSeeds.json');
const reportingStructureSeeds = require('./reportingStructureSeeds.json')

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
        // await Certification.deleteMany({});
        // await Certification.create(certificationSeeds);
        await ReportingStructure.deleteMany({});
        await ReportingStructure.create(reportingStructureSeeds);

        console.log("Successfully seeded!");
        process.exit(0);
    } catch(err){
        throw err
    }
});