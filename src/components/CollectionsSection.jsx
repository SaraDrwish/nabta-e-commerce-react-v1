import React from 'react';
import '../assets/css/components.css';  
 
function CollectionsSection({ collections, onNavigate }) {

    const handleCollectionClick = (targetView) => {
        // يمكن تغيير هذا ليودي إلى صفحة منتجات مصفاة إذا لزم الأمر
        onNavigate(targetView); 
    };

    return (
        <section className="collections-section section-padding">
            <div className="container">
                <h2 className="section-title">🌿 اكتشف مجموعاتنا</h2>
                
                {/* تم تطبيق class collections-grid-layout ليعرض مربعات جنب بعض */}
                <div className="collections-grid-layout">
                    {collections.map(collection => (
                        <div 
                            key={collection.id} 
                            className="collection-card"
                            onClick={() => handleCollectionClick(collection.targetView)}
                        >
                            {/* ✅ المسار المطلق للصور */}
                            <img 
                                src={`../../public/images/${collection.img}`} 
                                alt={collection.title} 
                                className="collection-image"
                            />
                            <div className="collection-info">
                                <h3>{collection.title}</h3>
                                <p>{collection.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CollectionsSection;