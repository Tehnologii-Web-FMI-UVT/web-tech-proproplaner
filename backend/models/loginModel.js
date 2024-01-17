const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({    
    First_Name: String,
    Last_Name:String,
    email: String,
    password: String
},
{
    collection:"Users"
}
)

const UserModel = mongoose.model("Users",UserSchema)
module.exports = UserModel