const {Schema, model} = require('mongoose');

const reportingStructureSchema = new Schema({
    profileId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    manager:{
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    reports: [
        {
            type: Schema.Types.ObjectId,
            ref:"Profile"
        }

    ],
});

const ReportingStructure = model('ReportingStructure', reportingStructureSchema);

module.exports = ReportingStructure;