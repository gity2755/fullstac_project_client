import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './imageSlider.css'; // Create this CSS file for your custom styles
import img1 from './homePageImg.webp'
import img2 from './slide images/WB3CP4916E,WB3CP4916SK,WB3CP4916D,WB3CP4882T.jpg'
import img3 from './slide images/WB3CP4916E.jpg'
import img5 from './slide images/WB3CY2153BG,WB3CY2153BB (4).jpg'
import img6 from './slide images/WB3CY2226BLB,WB3CY2226BLG,WB3CY2226BG,WB3CY2226EB (2).jpg';
import img7 from './slide images/WB3CY2226SG (2).jpg'
import img8 from './slide images/WB3CY2226EG,WB3CY2226SG (7).jpg'


const ImageSlider = () => {
    const images = [img1, img2, img3, img5,img6,img7,img8]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,          // Enable autoplay
        autoplaySpeed: 3000,     // Set autoplay interval to 5000 milliseconds (5 seconds)
    };
    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img id="img" src={image} alt={`Slide ${index + 1}`} />
                    <div className="overlay">
                        <p>Your overlay content</p>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default ImageSlider;
