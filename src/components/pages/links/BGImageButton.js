import React from 'react';
import "./BGImageButton.css"

const BGImageButton = ({ setBgImg }) => {

  const changeBackgroundImage = (event) => {
    const selection = event.target.value;
    console.log(selection);
    setBgImg(selection)
  };

  return (
    <select className="bg-dropdown" onChange={changeBackgroundImage}>
      <option value="container">Select Image</option>
      <option value="container">Bookshelf</option>
      <option value="spring">Spring Flowers</option>
      <option value="vu">Chapel</option>
    </select>
  );
};

export default BGImageButton;
