import React, { useState } from 'react';
import '../assets/css/style.css'; 
import ProductList from './ProductList';  


function ProductDetail({ product, onBack, onAddToCart }) {
    // 🚨 تم حذف حالة الكمية (useState(1))
    
    if (!product) {
        return <div>المنتج غير متوفر.</div>;
    }
    
    // 🚨 دالة لمعالجة النقر على زر الإضافة للسلة - تثبيت الكمية على 1
    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product, 1); // نرسل الكمية 1
        }
    };
    

    return (
        <div className="product-detail-page section-padding">
            <button className="btn back-btn" onClick={onBack}>
                <i className="fas fa-arrow-right"></i> العودة للمنتجات
            </button>
            
            <div className="product-detail-container">
                {/* 1. قسم الصورة */}
                <div className="detail-image-box">
                    <img src={`/images/${product.img}`} alt={product.name} className="detail-image" />
                </div>
                
                {/* 2. قسم المعلومات */}
                <div className="detail-info-box">
                    <h1 className="detail-name">{product.name}</h1>
                    <div className="detail-review">{'★'.repeat(Math.round(product.rating))} ({product.reviews} تقييم)</div>
                    <div className="detail-price">{product.price.toFixed(2)} ر.س</div>
                    
                    <div className="detail-description">
                        <h3>وصف المنتج</h3>
                        <p>{product.description}</p>
                    </div>

                    {/* 🚨 زر الإضافة فقط - تم حذف حقل الكمية */}
                    <div className="quantity-and-add">
                        <button 
                            className="btn primary-btn add-to-cart-detail-btn" 
                            onClick={handleAddToCart}
                        >
                            <i className="fas fa-cart-plus"></i> إضافة للسلة
                        </button>
                    </div>

                    <div className="product-features">
                        <h4>مميزات رئيسية:</h4>
                        <ul>
                            <li>يشمل وعاء زراعة فاخر</li>
                            <li>تعليمات العناية الشاملة</li>
                            <li>ضمان وصول النبتة حية وسليمة</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;