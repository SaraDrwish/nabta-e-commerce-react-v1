import React from 'react';
import '../assets/css/components.css';

// تم إضافة isMini كخاصية
function ContactForm({ isMini = false, onNavigate }) {

    // ✅ المسار المطلق الصحيح
    const imagePath = `/images/contact-plant.jpg`; 

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.');
    };
    
    const handleNavigate = (e) => {
        e.preventDefault();
        onNavigate('contact'); 
    };

    // إذا كانت النسخة مصغرة (في الصفحة الرئيسية)
    if (isMini) {
        return (
            <section className="mini-section contact-mini section-padding">
                <div className="container mini-grid reverse-grid">
                    
                    {/* الصورة المصغرة على اليمين */}
                    <div className="mini-image-wrapper">
                        {/* ⚠️ سيتم تعديل ارتفاع هذه الصورة ليصبح أقل في ملف CSS */}
                        <img 
                            src={imagePath} 
                            alt="تواصل معنا" 
                            className="mini-rounded-image"
                        />
                    </div>
                    
                    {/* المحتوى على اليسار */}
                    <div className="mini-content">
                        <h2 className="section-title">💬 لديك استفسار؟</h2>
                        <p>
                            نحن جاهزون للإجابة على جميع أسئلتك. اضغط الزر للتحدث معنا عبر نموذج الاتصال المباشر.
                        </p>
                        <button 
                            className="btn secondary-btn" 
                            onClick={handleNavigate}
                        >
                            انتقل لصفحة التواصل
                        </button>
                    </div>
                </div>
            </section>
        );
    }


    // إذا كانت النسخة كاملة (صفحة /contact)
    return (
        <section className="contact-section full-page section-padding">
            <div className="container contact-grid">
                
                <div className="contact-form-wrapper">
                    <h2 className="section-title">نموذج تواصل مباشر</h2>
                    <p style={{ marginBottom: '30px', color: '#666' }}>
                        نحن هنا لمساعدتك والإجابة على استفساراتك.
                    </p>
                    <form onSubmit={handleSubmit} className="simple-form">
                        <div className="form-group">
                            <label htmlFor="name">الاسم الكامل:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">البريد الإلكتروني:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">رسالتك:</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="btn primary-btn">إرسال الرسالة</button>
                    </form>
                </div>

                <div className="contact-image-wrapper">
                    <img 
                        src={imagePath} 
                        alt="صورة نباتية جميلة" 
                        className="aesthetic-image"
                    />
                </div>
            </div>
        </section>
    );
}

export default ContactForm;