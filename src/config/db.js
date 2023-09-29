const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true
        });
        console.log(`Connected to Mongodb Database ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongodb Database Error ${mongoose.connection.host}`)
        console.log(error)
    }
}
module.exports = connectDB;