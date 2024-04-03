import React, { useState } from 'react';
import "./BGImageButton.css"

const BGImageButton = (props) => {
  //const [bgImg, setBgImg] = useState('');

  const changeBackgroundImage = () => {
    const imageList = ["bg.jpg","springbg.jpg","valpochapel.png"] 
    props.setBgImg(imageList);
    console.log(imageList);
  };
  //this needs to be props in App.js I think

  return (
    <div style={{ backgroundImage: `url(./images/${props.bgImg})`}}>
      <button className="bg-dropdown" onClick={changeBackgroundImage}>Change BG</button>
    </div>
  );
};

export default BGImageButton;
