import React from 'react';
import '../assets/css/components.css';
 
 
// 🚨 تم إضافة onViewProduct
function ProductCard({ product, onAddToCart, onViewProduct }) { 
  const imagePath = `../../public/images/${product.image}`; 
  const starRating = '⭐️'.repeat(Math.floor(product.review)) + (product.review % 1 >= 0.5 ? '⭐' : '');

  return (
    // 🌟 النقر على أي مكان في البطاقة يفتح صفحة المنتج
    <div className="product-card" onClick={() => onViewProduct(product)}> 
      <div className="image-container">
          <img src={imagePath} alt={product.name} className="product-image" />
          <div className="quick-view-btn">نظرة سريعة</div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-review">{starRating} ({product.review})</p>
        <p className="product-price">{product.price.toFixed(2)} ر.س</p>
        
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
             e.stopPropagation(); // 🌟 يمنع النقر على الزر من تشغيل دالة onViewProduct للبطاقة
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