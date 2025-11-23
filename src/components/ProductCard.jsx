import React from 'react';
import '../assets/css/components.css';
 
function ProductCard({ product, onAddToCart, onViewProduct }) { 

  const imagePath = `/images/${product.img}`; 
  
  const ratingValue = product.rating || 0; 
  const starRating = '⭐️'.repeat(Math.floor(ratingValue)) + (ratingValue % 1 >= 0.5 ? '⭐' : '');

  return (
    <div className="product-card" onClick={() => onViewProduct(product)}> 
      <div className="image-container">
          {/* استخدام المسار المصحح */}
          <img src={imagePath} alt={product.name} className="product-image" />
          <div className="quick-view-btn">نظرة سريعة</div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-review">{starRating} ({ratingValue})</p>
        <p className="product-price">{product.price.toFixed(2)} ر.س</p>
        
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
             e.stopPropagation(); 
             onAddToCart(product);
          }}
        >
          أضف للسلة
        </button>
      </div>
    </div>
  );
}

export default ProductCard;