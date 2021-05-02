
const mongoose = require("mongoose");
const uri = (process.env.DATABASE_URI) || "mongodb://localhost:27017/Edumee";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`Correctly Connected to MongoDB Server ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    };
}

module.exports = connectDB;