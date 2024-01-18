import React, {useState} from "react";
import { BrowserRouter } from 'react-router-dom'
import {BaraTop } from "../Assets/home_assets"
import { BaraLaterala } from "../Assets/myMeetsAssets";

import '../CSS/homepage.css'


function MyMeetsPage() {
  return( 
    <>
    <div className="page-home">
      <BaraTop/>
    <div className="content-wrapper-homepage">
    <BaraLaterala/>
    </div>
    </div>
    </>
    );
}

export default MyMeetsPage;