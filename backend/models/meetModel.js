const mongoose = require('mongoose')

const {ObjectId} = mongoose;
const MeetSchema = new mongoose.Schema({    
    id_user: ObjectId,
    Name: String,
    Date: String,
    Time: String,
    Location: String,
    Description: String,
    Link: String,
    Code: String,

},
{
    collection:"Meets"
}
)

const MeetModel = mongoose.model("Meets",MeetSchema)
module.exports = MeetModel