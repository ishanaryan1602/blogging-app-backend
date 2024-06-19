const mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://127.0.0.1:27017/lblobapp').then(()=>console.log('connection established to database')).catch(err=>console.log(err.message))
