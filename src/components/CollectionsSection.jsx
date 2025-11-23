import React from 'react';
import '../assets/css/components.css';


function CollectionCard({ collection }) {
    // ✅ التأكد من قراءة الخاصية 'img'
    const imagePath = `/images/${collection.img}`; 
    return (
        <a href={`#${collection.id}`} className="collection-card">
            <img src={imagePath} alt={collection.title} />
            <div className="collection-title-overlay">{collection.title}</div>
        </a>
    );
}

function CollectionsSection({ collections }) {
    return (
        <section className="collections-section">
            <div className="collections-container">
                {collections.map(collection => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </section>
    );
}

export default CollectionsSection;