import React from 'react';
import '../assets/css/components.css';

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1>🏡 حديقتك تبدأ من هنا</h1>
        <p>اكتشف أفضل أنواع النباتات الداخلية والأدوات الزراعية بجودة لا مثيل لها.</p>
        <div className="hero-buttons">
          <button className="btn primary-btn">تسوق الآن</button>
          <button className="btn secondary-btn">تعرف علينا</button>
        </div>
      </div>
      <div className="hero-image-placeholder">
        {/* Placeholder for complex layered image in design (handled via CSS background) */}
      </div>
    </section>
  );
}

export default HeroBanner;