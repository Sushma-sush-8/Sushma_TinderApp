const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://sushmaananda1998:LTm24TAvwfu9Ve6T@nodepractise.flu6lnx.mongodb.net/"
    )
};

module.exports = connectDB;