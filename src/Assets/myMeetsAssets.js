import { SetStateAction, useState , useEffect} from 'react';
import '../CSS/myMeetsAssets.css';


export const BaraLaterala = () => {
    const createdByMe = JSON.parse(sessionStorage.getItem('MyMeets'));
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleMeetingClick = (meeting) => {
      setSelectedMeeting(meeting);
      console.log(meeting);
    };
  
    const handleDeleteMeeting = async () => {
        try {
            console.log("selected=",selectedMeeting.Code);
          // Assuming selectedMeeting has an ID property
          const response = await fetch(`http://localhost:4000/delMeetings`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                code: selectedMeeting.Code
            })
          });
      
          if (response.ok) {
            // Handle success
            console.log('Meeting deleted successfully');
          } else {
            // Handle error
            console.error('Failed to delete meeting');
          }
        } catch (error) {
          console.error('Error during meeting deletion:', error.message);
        }
      };
  
    // Filter meetings based on search term
    const filteredMeetings = createdByMe.filter(
      (meeting) =>
        meeting.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <>
        <div className="baraLaterala">
          <h1>My Meets</h1>
  
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
  
          <ul>
            {filteredMeetings.map((meeting, index) => (
              <li key={index}>
                <p
                  className="meetingName"
                  onClick={() => handleMeetingClick(meeting)}
                >
                  Name: {meeting.Name}
                </p>
                <p className="meetingDate">
                  Date: {meeting.Date} {meeting.Time}
                </p>
              </li>
            ))}
          </ul>
        </div>
  
        {selectedMeeting && (
          <div className="showSelectedMeeting">
            
            <h2>Details for {selectedMeeting.Name}</h2>
            <p>Code: {selectedMeeting.Code}</p>
            <p>Date: {selectedMeeting.Date}</p>
            <p>Time: {selectedMeeting.Time}</p>
            <p>Description: {selectedMeeting.Description}</p>
            <p>Location: {selectedMeeting.Location}</p>
            <p>
              Link:{' '}
              <a
                href={selectedMeeting.Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedMeeting.Link}
              </a>
            </p>
            <button className='deleteButton' onClick={handleDeleteMeeting}>Delete Meeting</button>
          </div>
        )}
      </>
    );
  };