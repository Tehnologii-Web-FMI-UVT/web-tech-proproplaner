import React, { useState } from 'react';
import '../CSS/newMeet.css';
const PopupExample = () => {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('user'));
    let myLink="";
    if(showInput){
        myLink=e.target.link.value;
    }
    const meeting = {
      "id_user": userData._id,
      "name": e.target.name.value,
      "date": new Date(e.target.date.value),
      "time":e.target.time.value.toString(),
      "location":e.target.location.value,
      "description":e.target.description.value,
      "link": myLink,
    }

    console.log(meeting.date)

    try {
      const response = await fetch("http://localhost:4000/createMeet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          meeting
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data, "create meet");
  
      if (data.success) {
        window.location.href = '/homepage';
      } else {
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error("Error during new meeting:", error.message);
    }


    setShow(false);
  };

  const handleCheckboxChange = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      <button className='button-dash' onClick={handleShow}>Create Meet</button>

      {show && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
           <form className='newMeetForm' onSubmit={handleSubmit} >
            <div className='pereche-newMeet'>
              <label className='NewMeetLabel'>Name</label>
              <input type='text' placeholder='Meeting Name' name='name' className='InputNewMeet'/>
            </div>
            <div className='pereche-newMeet'>
              <label className='NewMeetLabel'>Date</label>
              <input className='InputNewMeet' type='date' name='date'/>
            </div>
            <div className='pereche-newMeet'>
              <label className='NewMeetLabel'>Time</label>
              <input className='InputNewMeet' type='time' name='time'/>
            </div>
            <div className='pereche-newMeet'>
              <label className='NewMeetLabel'>Location</label>
              <input className='InputNewMeet' type='text' maxLength={50} placeholder='Location' name='location' />
            </div>
            <div className='pereche-newMeet'>
              <label className='NewMeetLabel'>Description</label>
              <input className='InputNewMeet' type='text' placeholder='Description' name='description'/>
            </div>
            <div className='pereche-newMeet'>
              <label className='NewMeetLabel'>Link:<input type="checkbox" checked={showInput} onChange={handleCheckboxChange} /></label>
              
              {showInput && <input type="text" className='InputNewMeet' placeholder="Enter Link" name='link' />}
            </div>
            
            <button className='SubmitButton-NewMeet'>
              Create
            </button>
            <button className='CancelButton-NewMeet' onClick={handleClose}>
              Cancel
            </button>
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupExample;
