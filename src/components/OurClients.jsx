// src/components/OurClients.jsx
import React from 'react';

const OurClients = () => {
  return (
    <section className="our-clients">
      <h2>Our Clients</h2>
      <div className="client-logos">
        {/* Replace with actual client logos */}
        <img className='client-logos-img' src="src/assets/linkden.jpg" alt="Client 1" />
        <img className='client-logos-img' src="src/assets/linkden.jpg" alt="Client 2" />
        <img className='client-logos-img' src="src/assets/linkden.jpg" alt="Client 3" />
      </div>
    </section>
  );
};

export default OurClients;
