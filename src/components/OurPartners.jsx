// src/components/OurPartners.jsx
import React from 'react';

const OurPartners = () => {
  return (
    <section className="our-partners">
      <h2>Our Partners</h2>
      <div className="partner-logos">
        {/* Replace with actual partner logos */}
        <div>
          <img className='client-logos-img' src="src/assets/linkden.jpg" alt="Partner 1" />
          <p><h3 className='name'>Lasisi Matthew Adeola</h3></p>
        </div>
        <div>
          <img className='client-logos-img' src="src/assets/linkden.jpg" alt="Partner 2" />
          <p><h3 className='name'>Lasisi Matthew Adeola</h3></p>
        </div>
        <div>
          <img className='client-logos-img' src="src/assets/linkden.jpg" alt="Partner 3" />
          <p><h3  className='name'>Lasisi Matthew Adeola</h3></p>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
