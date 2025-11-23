import React from 'react';
import '../assets/css/components.css';  
import '../assets/css/style.css';  

function Cart({ cartItems, onCheckout, onQuantityChange, onRemoveItem, onNavigate, onProductClick }) {
    // onProductClick: دالة جديدة للانتقال لصفحة التفاصيل
    
    // دالة لحساب المجموع الإجمالي
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // إذا كانت السلة فارغة
    if (cartItems.length === 0) {
        return (
            <div className="cart-page-container checkout-page-container section-padding">
                <h2 className="section-title" style={{textAlign: 'center', color: 'var(--primary-dark-green)'}}>🛒 سلة المشتريات</h2>
                <div style={{textAlign: 'center', padding: '50px 0', border: '1px dashed #ccc', borderRadius: '10px', marginTop: '30px'}}>
                    <p style={{fontSize: '1.2em', color: '#888'}}>سلتك فارغة حالياً. ابدأ التسوق!</p>
                    <button 
                        className="btn primary-btn" 
                        style={{marginTop: '20px'}}
                        onClick={() => onNavigate('products')}
                    >
                        تصفح المنتجات
                    </button>
                </div>
            </div>
        );
    }
    
    // دالة للتعامل مع النقر على اسم المنتج للانتقال لصفحة التفاصيل
    const handleProductClick = (item) => {
        if (onProductClick) {
            // نمرر المنتج نفسه الذي في السلة
            onProductClick(item);
        }
    };

    return (
        <div className="cart-page-container checkout-page-container section-padding">
            <h2 className="section-title" style={{textAlign: 'center', color: 'var(--primary-dark-green)'}}>🛒 سلة المشتريات</h2>
            
            <div className="order-summary" style={{marginTop: '30px'}}>
                <div className="cart-header">
                    <div style={{flexBasis: '40%', textAlign: 'right'}}>المنتج</div>
                    <div style={{flexBasis: '20%', textAlign: 'center'}}>الكمية</div>
                    <div style={{flexBasis: '20%', textAlign: 'center'}}>السعر</div>
                    <div style={{flexBasis: '20%', textAlign: 'left'}}>الإجمالي</div>
                </div>
                
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item-row">
                            
                            {/* 🚨 تمكين النقر على اسم المنتج (يمين) */}
                            <div style={{flexBasis: '40%', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                {/* الصورة */}
                                <img src={`/images/${item.img}`} alt={item.name} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px'}} />
                                
                                {/* 🚨 الاسم يصبح رابطاً */}
                                <span 
                                    onClick={() => handleProductClick(item)} 
                                    style={{
                                        cursor: 'pointer', 
                                        color: 'var(--primary-dark-green)', 
                                        fontWeight: '700',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {item.name}
                                </span>
                            </div>
                            
                            {/* التحكم بالكمية (وسط) */}
                            <div style={{flexBasis: '20%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
                                {/* زر النقصان */}
                                <button 
                                    className="icon-btn" 
                                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1} 
                                    style={{fontSize: '0.8em', padding: '3px 7px', height: '30px'}}
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                
                                <span style={{fontWeight: 'bold', width: '25px', display: 'inline-block'}}>{item.quantity}</span>
                                
                                {/* زر الزيادة */}
                                <button 
                                    className="icon-btn" 
                                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                    style={{fontSize: '0.8em', padding: '3px 7px', height: '30px'}}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            
                            {/* سعر الوحدة (وسط) */}
                            <div style={{flexBasis: '20%', textAlign: 'center'}}>
                                {item.price.toFixed(2)} ر.س
                            </div>

                            {/* الإجمالي للوحدة (يسار) */}
                            <div style={{flexBasis: '20%', textAlign: 'left', fontWeight: 'bold'}}>
                                {(item.price * item.quantity).toFixed(2)} ر.س
                                {/* زر الحذف */}
                                <button 
                                    className="icon-btn" 
                                    onClick={() => onRemoveItem(item.id)}
                                    style={{fontSize: '1em', color: '#e74c3c', marginRight: '15px'}}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* صف الإجمالي */}
                <div className="total-row">
                    <div style={{flexBasis: '80%', textAlign: 'right'}}>المجموع الكلي:</div>
                    <div style={{flexBasis: '20%', textAlign: 'left'}}>{calculateTotal().toFixed(2)} ر.س</div>
                </div>

            </div>
            
            {/* زر المتابعة للدفع */}
            <button 
                className="btn primary-btn" 
                onClick={onCheckout}
                style={{width: '100%', marginTop: '30px', padding: '15px', fontSize: '1.2em'}}
            >
                إتمام الطلب والدفع
            </button>
        </div>
    );
}

export default Cart;