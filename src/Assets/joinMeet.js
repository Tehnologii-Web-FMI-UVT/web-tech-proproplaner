import React, { useState } from 'react';
import '../CSS/joinMeet.css';
const JoinMeet = () => {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false); // Moved showInput state to the outer component

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const my_meeting = {
      "my_user": userData._id,
      "my_code": e.target.code.value
    }
    // console.log(meeting);

    try {
      const response = await fetch("http://localhost:4000/joinMeet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          my_meeting
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
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
      <button className='button-dash' onClick={handleShow}>Join Meet</button>

      {show && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
           <form className='newMeetForm' onSubmit={handleSubmit}>
            <div className='pereche-newMeet'>
              <label className='NewMeetLabel'>Enter Code</label>
              <input type='text' placeholder='Enter Meeting Code' name='code' className='InputJoinMeet'/>
            </div>
            
            <button className='SubmitButton-NewMeet'>
              Join Meet
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

export default JoinMeet;
