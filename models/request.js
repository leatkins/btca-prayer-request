const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const requestSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    request: {
        type: String,
        required: true
    }
}, { timestamps: true}); 

const prayerRequest = mongoose.model('prayerRequest', requestSchema);
module.exports = prayerRequest; 