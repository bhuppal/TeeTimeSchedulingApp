import React from "react";
import "./app-containter.css";

import AppHeader from "../app-header/app-header";
import AppFooter from "../footer/app-footer";
import AppMain from "../app-main/app-main";
import Contact from "../contact/contact";
import About from "../about/about";
import Login from "../login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacilityDetails from "../facility-details/facility-details";

import { ThemeProvider } from "styled-components";
import  { useDarkMode } from "../../component/style/useDarkMode";
import { GlobalStyles } from "../style/Globalstyle";
import { lightTheme, darkTheme } from "../style/Themes";
import { Toggle }  from "../style/Toggler";

const App = () => {

  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return ( 

    <ThemeProvider theme={themeMode}>
    <>
    <GlobalStyles/>
    <BrowserRouter>
      <div className="App">
      <Toggle theme={theme} toggleTheme={themeToggler} />
        <AppHeader />
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-2 leftsidepanel"></div>
            <div className="col-sm-10 text-left">
              <hr />
            <h2 className='mb-8 text-center'><small>Daily Tee Time Scheduling</small></h2>
            <p className='text-left'>Instant booking allows you to complete tee time bookings without leaving the Supreme Golf iOS or Android app — or website. Currently, GolfNow, TeeOff by the PGA Tour and Golf18 Network participate in the Instant Booking feature on Supreme Golf. We are working with our other online providers to integrate their tee times into our Instant Booking service to create a seamless experience for everyone.</p>
            <Routes>
              <Route exact path="/" element={<AppMain />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/facilitydetails/:facilityId" element={<FacilityDetails />} />
            </Routes>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </BrowserRouter>
    </>
    </ThemeProvider>
  );
}

export default App;
