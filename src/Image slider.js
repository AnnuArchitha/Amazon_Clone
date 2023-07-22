import amazon2 from './images/amazon2.jpg'
import amazon3 from './images/amazon3.jpg'
/*https://in.pinterest.com/advertgallery/amazon-advertisements/
imagesslide =[]*/
import './Image slider.css'
import React, { useState, useEffect } from  'react';

function ImageSlider() {
    const [index, setIndex] = useState(0);
const images = ["https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
amazon2,amazon3];
useEffect(() => {
  const intervalId = setInterval(() => {
  setIndex(prevIndex => (prevIndex + 1) % images.length);
  }, 3000);
  return () => clearInterval(intervalId);
  }, []);
  return (
    <img className = 'home__image' src={images[index]}  alt= 'Img is not loaded' width = '894' height= '400'/>
  )
}

export default ImageSlider;