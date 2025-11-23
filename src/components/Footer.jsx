import React from 'react';
import '../assets/css/components.css';


function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Nabta</h4>
          <p>متجرك المتخصص في عالم الزراعة والبستنة. نجعل الطبيعة أقرب إليك.</p>
        </div>
        <div className="footer-section">
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="#about">من نحن</a></li>
            <li><a href="#blog">المدونة</a></li>
            <li><a href="#careers">الوظائف</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>الدعم والمساعدة</h4>
          <ul>
            <li><a href="#faqs">الأسئلة الشائعة</a></li>
            <li><a href="#shipping">الشحن والتوصيل</a></li>
            <li><a href="#returns">سياسة الإرجاع</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>تابعنا</h4>
          <p>انستجرام | تويتر | فيسبوك</p>
        </div>
      </div>
      <div className="copyright">
        &copy; {currentYear} متجر نبتة. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

export default Footer;