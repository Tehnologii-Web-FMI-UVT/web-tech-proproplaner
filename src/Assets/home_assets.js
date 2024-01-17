import { SetStateAction, useState , useEffect} from 'react';
import Calendar from 'react-calendar';
import NewMeet from './newMeet';
import CustomDay from './customDay';
import JoinMeet from './joinMeet';
import '../CSS/homepage.css';

export const BaraTop = () => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const myName = userData.First_Name;
    return (
    <>
     <div className="top">
        <img src="https://cdn-icons-png.flaticon.com/512/747/747775.png" className="logo"/>
        <h1>ProPlaner</h1>
        <h1 className="name">{myName}</h1>
     </div>
     </>
    ) 
 }

 export const BaraLaterala = () => {
    const handleMyMeets = () => {
        window.location.href = '/myMeets';
      };

    return(<>
        <div className="baraLaterala">
            <div className="butoane">
            <button className="button-dash" onClick={handleMyMeets}>My Meets</button>
            <NewMeet/>
            <JoinMeet/> 
            </div>
        </div>

    </>)
 }



 export const CalendarAsset = () => {
    const [date, setDate] = useState(new Date());

    const formatDay = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    const [selectedDay, setSelectedDay] = useState(formatDay(date));

    const onChange = (newDate) => {
        setDate(newDate);
        setSelectedDay(formatDay(newDate));
    };
    


    return (
        <>
            <div className="SchedualDiv">
                <h1>Your schedule</h1>
                <div className="calendarDiv">
                    <Calendar onChange={onChange} value={date}
                    tileContent={({ date }) => <CustomDay date={date} />} 
                    />
                </div>
            </div>
            <ProgramZi date={selectedDay} />
        </>
    );
};

export const ProgramZi = ({ date }) => {
    const allMeetings = JSON.parse(sessionStorage.getItem("MyMeets"));
    const selectedDate= new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    const formattedDateString = selectedDate.toISOString().split('T')[0];
    
    
    // Filter meetings based on the specified date
    
    const filteredMeetings = allMeetings.filter(meeting => meeting.Date === formattedDateString);
  console.log(filteredMeetings);
    return (
      <>
        <div className='daySchedual'>
          <h1>{date}</h1>
          <ul>
            {filteredMeetings.map((meeting, index) => (
              <li key={index}>
                <p>Name: {meeting.Name}</p>
                <p>Time: {meeting.Time}</p>
                <p>Location: {meeting.Location}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };
  
  