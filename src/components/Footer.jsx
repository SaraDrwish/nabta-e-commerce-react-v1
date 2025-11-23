import React from 'react';
import '../assets/css/components.css'; // يجب أن يكون هذا الملف موجوداً

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    
                    {/* 1. معلومات المتجر */}
                    <div className="footer-column info-column">
                        <h3><i className="fas fa-leaf"></i> متجر النباتات</h3>
                        <p>وجهتك الأولى للنباتات الداخلية الفاخرة وأدوات العناية بها. نزرع الجمال في بيتك.</p>
                        <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
                    </div>

                    {/* 2. روابط سريعة (يمكنك تعديلها لاحقاً) */}
                    <div className="footer-column links-column">
                        <h3>روابط سريعة</h3>
                        <ul>
                            <li><a href="#">الشحن والتوصيل</a></li>
                            <li><a href="#">سياسة الاسترجاع</a></li>
                            <li><a href="#">الأسئلة الشائعة</a></li>
                        </ul>
                    </div>

                    {/* 3. التواصل والسوشيال ميديا */}
                    <div className="footer-column social-column">
                        <h3>تابعنا</h3>
                        <div className="social-icons">
                            {/* 🟢 أيقونات وروابط السوشيال ميديا المصححة */}
                            <a href="https://facebook.com/yourstore" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com/yourstore" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://twitter.com/yourstore" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;