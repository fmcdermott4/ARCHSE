const {Schema, model} = require('mongoose');

const auditTypeSchema = new Schema({
    auditType:{
        type: String,
        required: true,
        trim: true
    }    
});

const AuditType = model('AuditType', auditTypeSchema);

module.exports = AuditType;