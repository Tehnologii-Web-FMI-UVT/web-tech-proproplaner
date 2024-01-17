require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts.js')
const UserModel = require('./models/loginModel.js')
const MeetModel = require('./models/meetModel.js')
const UserMeetModel = require('./models/userMeetsModel.js')
const cors = require('cors');
// express app
const app = express()
app.use(cors());
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 


  function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
  
    return randomCode;
  }


  app.post("/register", async (req, res) => {
    const { registerFirstName, registerLastName, registerEmail, registerPassword } = req.body;
  
    try {
      const existingUser = await UserModel.findOne({ email: registerEmail });
  
      if (existingUser) {

        res.status(409).json({ status: "error", message: "Email already in use" });
      } else {
        const newUser= await UserModel.create({
          First_Name: registerFirstName,
          Last_Name: registerLastName,
          email: registerEmail,
          password: registerPassword
        });
        res.send({ status: "ok" , user: newUser});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
  


app.post("/login", async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  try {
    const user = await UserModel.findOne({ email: loginEmail });

    if (user) {
      const isPasswordValid = loginPassword === user.password;

      if (isPasswordValid) {
        res.json({ success: true, user });
      } else {
        res.json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



app.post("/MyMeets", async (req, res) => {
  const { id_user} = req.body;

  try {
    const MyMeets = await MeetModel.find({ id_user: id_user });
    const JoinedMeets = await UserMeetModel.find({id_user: id_user});

    

    for (let i = 0; i < JoinedMeets.length; i++) {
      let isAlreadyInserted = false;

      const joined = JoinedMeets[i];
    
      const isDuplicate = MyMeets.some((myMeet) => myMeet.Code === joined.Code);
    
      if (isDuplicate) {
        console.log(`Elementul cu Code ${joined.Code} este deja în MyMeets.`);
        isAlreadyInserted = true;
        break;
      }
    
      if (!isAlreadyInserted) {
        const myData = await MeetModel.findOne({Code: joined.Code});
        MyMeets.push(myData);
      }
    }
    
    // console.log(MyMeets);
    
    
    

    if (MyMeets) 
        res.json({ success: true, MyMeets: MyMeets });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/createMeet', async (req, res) => {
  const { id_user, name, date, time, location, description,link } = req.body.meeting;
  try {
    const formattedDate = new Date(date);
    const formattedDateString = formattedDate.toISOString().split('T')[0];
    const existingMeeting = await MeetModel.findOne({ Name: name, Date: formattedDate });

    if (existingMeeting) {
      return res.status(409).json({ status: 'error', message: 'Meeting with the same name and date already exists' });
    }

    const randomCode = generateRandomCode(20);
    const newMeeting = await MeetModel.create({
      id_user,
      Name: name,
      Date: formattedDateString,
      Time: time,
      Location: location,
      Description: description,
      Link: link,
      Code: randomCode,
    });

    res.status(201).json({ status: 'ok', message: 'Meeting created successfully', meeting: newMeeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});



app.post('/joinMeet', async (req, res) => {
  const {my_user,my_code} = req.body.my_meeting;

  try {
    const find_meeting = await MeetModel.findOne({ Code: my_code });

    if (find_meeting.id_user.toString() === my_user) {
      return res.status(403).json({ status: 'error', message: 'User cannot join their own meeting' });
    }

    const userAlreadyInMeeting = await UserMeetModel.findOne({ id_user:my_user, Code: my_code });
    if (userAlreadyInMeeting) {
      return res.status(409).json({ status: 'error', message: 'User is already in the meeting' });
    }
    const my_date = find_meeting.Date;
    await UserMeetModel.create({ 
      id_user:my_user.toString(),
      Date: my_date,
      Code: my_code 
    });

    res.status(201).json({ status: 'ok', message: 'Meeting joined successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

});


app.delete('/delMeetings', async (req, res) => {
  try {
    console.log(req.body);
    const { code } = req.body;
    console.log("Code=",code);
    await MeetModel.deleteMany({ Code: code });

    await UserMeetModel.deleteMany({ Code: code });

    res.json({ success: true, message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error during meeting deletion:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

