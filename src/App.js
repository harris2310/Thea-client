/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import './css/main.css';
import uuid from 'react-uuid';
import MapComp from './components/MapComp';
import LandingPage from './components/LandingPage';
import { apiPostCall, imageCall, dataCall } from './Api';

const App = () => {
  const [clickedStart, setClickedStart] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputImage, setInputImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formPending, setFormPending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formDenied, setFormDenied] = useState(false);
  const [imageFetched, setImageFetched] = useState(false);
  const [stored, setStored] = useState([]);
  const [inputImageName, setInputImageName] = useState('');
  const [messages, setMessages] = useState(null);
  const [messagesFetched, setMessagesFetched] = useState(false);
  const [pos, setPos] = useState(null);

  // COMMENT FOR CLIENT ONLY

  useEffect(() => {
    async function fetchToApi() {
      const messagesToState = await dataCall();
      setMessages(messagesToState);
      setMessagesFetched(true);
    }
    fetchToApi();
  }, []);

  const handleImageFetch = (e) => {
    console.log(e);
    async function fetchToApiImage() {
      const imageToState = await imageCall(e);
      setInputImage(imageToState);
      setImageFetched(true);
    }
    fetchToApiImage(e);
  };

  const handleClicked = () => {
    setClickedStart(true);
  };

  const handlePos = (e) => {
    const value = e.latlng;
    setPos(value);
    console.log(pos);
  };

  const handleInputChange = (e) => {
    e.persist();
    setInputValue(e.target.value);
  };

  const handleFileSelected = (e) => {
    setInputImageName(e.target.files[0].name);
    setInputImage(e.target.files[0]);
    setImageLoaded(true);
  };

  const handleFormSubmit = async (e) => {
    const latlng = JSON.stringify(pos);
    const formData = new FormData();
    formData.append('latlng', latlng);
    formData.append('message', inputValue);
    formData.append('uniqueId', uuid());
    formData.append('image', inputImage);
    console.log(formData);
    const res = await apiPostCall(e, formData);
    if (res.status == '200') {
      console.log('success');
      setFormSubmitted(true);
    } else {
      console.log('failed');
    }
  };
  const formValidation = (e) => {
    e.preventDefault();
    if (inputImage === null) {
      console.log('Enter an image please');
      setFormDenied(true);
    } else {
      setFormPending(true);
      handleFormSubmit(e);
    }
  };

  return (
    <div>
      {(clickedStart && messagesFetched)
        ? (
          <MapComp
            stored={stored}
            messages={messages}
            inputValue={inputValue}
            inputImage={inputImage}
            imageFetched={imageFetched}
            imageLoaded={imageLoaded}
            formPending={formPending}
            formSubmitted={formSubmitted}
            formDenied={formDenied}
            inputImageName={inputImageName}
            setStored={setStored}
            setImageFetched={setImageFetched}
            formValidation={formValidation}
            handleInputChange={handleInputChange}
            handleFileSelected={handleFileSelected}
            handleImageFetch={handleImageFetch}
            handlePos={handlePos}
            pos={pos}
          />
        )
        : (
          <LandingPage
            handleClicked={handleClicked}
            clickedStart={clickedStart}
          />
        )}
    </div>
  );
};

export default App;
