// الموقع: components/ProductList.jsx (النسخة النهائية المصححة)

import React from 'react';
import ProductCard from './ProductCard'; 
import '../assets/css/style.css'; 

 function ProductList({ products, onAddToCart, onProductClick }) { 
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
            
             onViewProduct={onProductClick} 
        />
      ))}
    </div>
  );
}

export default ProductList;