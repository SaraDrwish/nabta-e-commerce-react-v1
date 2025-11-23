import React from 'react';
import '../assets/css/components.css';

// تم إضافة isMini كخاصية
function AboutUsSection({ onNavigate, isMini = false }) {
    
    // ✅ المسار المطلق الصحيح
    // يُفضل استخدام صورة تعبيرية جيدة في مجلد public/images
    const imagePath = `/images/about-us.jpg`; 

    const handleDetailsClick = (e) => {
        e.preventDefault();
        // التوجيه إلى الصفحة الكاملة "من نحن"
        onNavigate('about'); 
    };

    // إذا كانت النسخة مصغرة (في الصفحة الرئيسية)
    if (isMini) {
        return (
            <section className="mini-section about-mini section-padding">
                <div className="container mini-grid">
                    
                    <div className="mini-content">
                        <h2 className="section-title">✨ نبذة عن متجرنا</h2>
                        <p>
                            بدأت قصتنا بحب عميق للنباتات الداخلية. نحن نؤمن بأن الخضرة هي روح المكان. نقدم لك أرقى الأنواع بأفضل جودة ورعاية.
                        </p>
                        <button 
                            className="btn primary-btn" 
                            onClick={handleDetailsClick}
                        >
                            اكتشف قصتنا
                        </button>
                    </div>
                    
                    {/* الصورة الجمالية المصغرة */}
                    <div className="mini-image-wrapper">
                        <img 
                            src={imagePath} 
                            alt="متجرنا" 
                            className="mini-rounded-image"
                        />
                    </div>
                </div>
            </section>
        );
    }

    // إذا كانت النسخة كاملة (صفحة /about)
    return (
        <section className="about-us-section full-page section-padding">
            <div className="container about-grid">
                
                <div className="about-content">
                    <h2 className="section-title">القصة الكاملة لمتجر النباتات</h2>
                    <p>
                        نحن متجر متخصص وُلد من حب عميق للطبيعة والنباتات الداخلية. نؤمن بأن كل منزل يستحق لمسة من الخضرة لتنقية الهواء وإضفاء شعور بالهدوء والراحة. هدفنا هو تقديم أجود النباتات وأكثرها ندرة، مع توفير كل الأدوات والمعلومات اللازمة لنجاحك في رعايتها.
                    </p>
                    <p>
                        بدأنا بفكرة بسيطة: جعل العناية بالنباتات تجربة ممتعة وسهلة للجميع، من المبتدئين إلى الخبراء.
                    </p>
                    <button 
                        className="btn secondary-btn" 
                        onClick={() => onNavigate('products')}
                        style={{ marginTop: '20px' }}
                    >
                        شاهد منتجاتنا
                    </button>
                </div>
                
                <div className="about-image-wrapper">
                    <img 
                        src={imagePath} 
                        alt="فريق المتجر يعمل مع النباتات" 
                        className="rounded-image"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutUsSection;