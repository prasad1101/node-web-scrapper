const mongoose = require("mongoose")
const conn = mongoose.createConnection('mongodb://localhost/scrapper');
const scrappingModel = conn.model('scrappingJobs', new mongoose.Schema({}, { strict: false }));

const saveToMongo = (jobObj, cb) => {
    const m = new scrappingModel(jobObj);
    m.save();
    if (cb) {
        cb()
    }
}

module.exports = { saveToMongo }
