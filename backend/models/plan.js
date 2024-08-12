const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name: { type: String, required: true },
    data: { type: Number, required: true },  // Data in GB
    price: { type: Number, required: true }  // Price in USD
});

module.exports = mongoose.model('Plan', planSchema);
