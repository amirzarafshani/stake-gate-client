import React, { useEffect, useState } from 'react';
import slidersService from '../../../services/slidersService';
import { default as SlickSlider } from 'react-slick';
import config from '../../../config';

export default function Slider({ referralCode }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);

    slidersService
      .getAll()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const settings = {
    // centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,

    adaptiveHeight: true,
    // cssEase: 'linear',
    // variableWidth: true,
    // variableHeight: true,
    // fade: true,
    // centerPadding: '60px',
    autoplay: true,
    cssEase: 'ease',
    // autoplaySpeed: 7000,
    speed: 500,
    useCSS: true,
    adaptiveHeight: true,
  };

  return (
    <div className="md:container mx-auto md:my-5 md:px-5">
        <SlickSlider {...settings}>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <div data-index={index} key={`slider-${item.id}`}>
                <img src={`${config.apiUrl}${item.image?.url}`} alt="" />
              </div>
            ))
          ) : (
            <div key={0} />
          )}
        </SlickSlider>
     
    </div>
  );
}
