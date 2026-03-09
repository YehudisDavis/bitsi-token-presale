import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="App-header">
      <h1 className="heading-main">Become a partner in launching BITSI – the protection layer for crypto holders.</h1>
      <p className="subtext">Join the presale and get discounted vouchers for the BITSI token sale.</p>
      <p className="subtext">Early supporters get bonus buying power!</p>
      <Link to="/vouchers">
        <button className="button-primary">
          Participate & Get Coupon
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
