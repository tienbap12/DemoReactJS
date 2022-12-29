import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../../../src/styles.scss';

function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);
  return (
    <Carousel>
      <div>
        <img src="https://api.lorem.space/image/shoes?w=640&h=480&r=275,https://api.lorem.space/image/shoes?w=640&h=480&r=8932,https://api.lorem.space/image/shoes?w=640&h=480&r=7324" />
        <p className="legend">Shoes 1</p>
      </div>
      <div>
        <img src="https://api.lorem.space/image/shoes?w=640&h=480&r=275,https://api.lorem.space/image/shoes?w=640&h=480&r=8932,https://api.lorem.space/image/shoes?w=640&h=480&r=7324" />
        <p className="legend">Shoes 2</p>
      </div>
      <div>
        <img src="https://api.lorem.space/image/shoes?w=640&h=480&r=4234,https://api.lorem.space/image/shoes?w=640&h=480&r=5136,https://api.lorem.space/image/shoes?w=640&h=480&r=5368" />
        <p className="legend">Shoes 3</p>
      </div>
      <div>
        <img src="https://api.lorem.space/image/watch?w=640&h=480&r=3478,https://api.lorem.space/image/watch?w=640&h=480&r=1206,https://api.lorem.space/image/watch?w=640&h=480&r=4262" />
        <p className="legend">Watch 1</p>
      </div>
      <div>
        <img src="https://api.lorem.space/image?w=640&h=480&r=9008,https://api.lorem.space/image?w=640&h=480&r=4910,https://api.lorem.space/image?w=640&h=480&r=4267" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
}

export default Home;
