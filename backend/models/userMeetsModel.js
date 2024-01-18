const mongoose = require('mongoose')

const {ObjectId} = mongoose;
const userMeetSchema = new mongoose.Schema({    
    id_user: String,
    Date: String,
    Code: String    

},
{
    collection:"userMeets"
}
)

const userMeetModel = mongoose.model("userMeets",userMeetSchema)
module.exports = userMeetModel