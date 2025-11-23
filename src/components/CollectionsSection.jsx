import React from 'react';
import '../assets/css/components.css'; 
 

 function CollectionsSection({ collections, onNavigate }) { 
    
     const CollectionCard = ({ collection }) => {
        
         const imagePath = `../../public/images/${collection.img}`; 
        
        const handleClick = (e) => {
            e.preventDefault();
            onNavigate('products'); 
        };

        return (
            // ✅ استخدام collection.img و collection.title
            <a href="#" onClick={handleClick} className="collection-card">
                <img src={imagePath} alt={collection.title} /> 
                <div className="collection-title-overlay">{collection.title}</div>
            </a>
        );
    };

    // فحص أمان إذا كانت البيانات فارغة
    if (!collections || collections.length === 0) {
        return (
            <section className="collections-section section-padding" style={{textAlign: 'center'}}>
                <h2 className="section-title">لا توجد مجموعات متاحة حالياً.</h2>
            </section>
        );
    }
    
    return (
        <section className="collections-section section-padding">
            <div className="container">
                <h2 className="section-title">اكتشفي مجموعاتنا</h2>
            </div>
            <div className="collections-grid container"> 
                {/* 🟢 رسم بطاقات المجموعات */}
                {collections.map(collection => (
                    <CollectionCard 
                        key={collection.id} 
                        collection={collection} 
                    />
                ))}
            </div>
        </section>
    );
}

export default CollectionsSection;