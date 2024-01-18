import React, {useState} from "react";
import { BrowserRouter } from 'react-router-dom'
import {BaraTop , BaraLaterala,CalendarAsset, ProgramZi} from "../Assets/home_assets"

import '../CSS/homepage.css'


function Homepage() {
   
  async function generateMyMeets(){
    try {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const response = await fetch("http://localhost:4000/MyMeets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id_user: userData._id,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      sessionStorage.setItem('MyMeets', JSON.stringify(data.MyMeets));
      console.log(data, "login");
  
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  }

  generateMyMeets()


  return( 
    <>
    <div className="page-home">
      <BaraTop/>
    <div className="content-wrapper-homepage">
      <BaraLaterala/>
      <CalendarAsset/>
    </div>
    </div>
    </>
    );
}

export default Homepage;