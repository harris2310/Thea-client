/* eslint-disable global-require */
import React from 'react';
import '../css/main.css';
import { RotatingSquare } from 'react-loader-spinner';
import bgImageURL from "../images/background-image.png"

const LandingPage = (props) => (
  <div className="site">
    <header>
      <div className="header-container">
        <h1 className="title-thea">
          Thea
        </h1>
      </div>
    </header>
    <section className="site-content">
      <p className="app-description">
        It's an App where people can share their photos and pinpoint on the map where the photo was taken
        <br />
        <br />
        It's developed by me, Harris Hanozidis
      </p>
      <img src={bgImageURL} className="bg-image" alt="graphic" />
      <div className="start-container">
        {props.clickedStart != true
          ? <button className="start-button" onClick={props.handleClicked} type="button">Start!</button>
          : (
            <span className="loader" />
            /*
            <div className="loading-circle">
              <RotatingSquare height="40" width="40" color="#E0FBFC" />
            </div>
            */
          )}
      </div>
    </section>
    <footer>
      <div className="socials-title">
        My socials:
      </div>
      <div className="flex-footer">
        <div className="social-links">
          <a href="https://www.instagram.com/xxri145/">
            <img src={require('../images/instagram-logo.png')} alt="instagram logo" className="icons" />
          </a>
        </div>
        <div className="social-links">
          <a href="https://github.com/harris2310/">
            <img src={require('../images/github-logo.png')} alt="github logo" className="icons" />
          </a>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/harris-hanozidis-51b07421b/">
            <img src={require('../images/linkedin-logo.png')} alt="linkedin logo" className="icons" />
          </a>
        </div>
      </div>
    </footer>
  </div>
);

export default LandingPage;
