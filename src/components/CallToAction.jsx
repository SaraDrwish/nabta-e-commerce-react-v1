import React from 'react';
import '../assets/css/style.css';


function CallToAction({ title, subtitle, buttonText, image }) {
  const imagePath = `/images/${image}`; 
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <button className="btn white-btn">{buttonText}</button>
      </div>
      <div className="cta-image-container">
        <img src={imagePath} alt={title} className="cta-image" />
      </div>
    </section>
  );
}

export default CallToAction;