import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; 
import '../assets/css/style.css';

function CheckoutForm({ cartItems, totalAmount, onOrderComplete, onClose, onQuantityChange }) { 
    
    // حالات نموذج الشحن
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); // 🌟 حقل الهاتف الجديد
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash'); 
    
    // حالات عملية الإرسال
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // 🌟 خطوة جديدة: حالة لإدارة كميات المنتجات (إذا لم يتم تمرير دالة تغيير الكمية)
    const [localCartItems, setLocalCartItems] = useState(cartItems);

    // دالة محاكاة إرسال الطلب
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // التحقق الأساسي من الحقول (خاصة الهاتف والإيميل)
        if (!name || !email || !phone || !address || cartItems.length === 0) {
            alert("الرجاء ملء جميع الحقول الإلزامية في نموذج الشحن واختيار منتجات.");
            return;
        }

        // 🚨 محاكاة عملية الإرسال للخادم
        console.log("--- بيانات الطلب المرسلة ---");
        console.log("العميل:", name);
        console.log("الإيميل:", email);
        console.log("الهاتف:", phone);
        console.log("العنوان:", address);
        console.log("طريقة الدفع:", paymentMethod);
        console.log("تفاصيل الطلب:", cartItems);
        console.log("الإجمالي:", totalAmount);
        console.log("----------------------------");

        setIsProcessing(true);
        
        // محاكاة تأخير الإرسال
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true); 

            // 🌟 إظهار رسالة النجاح ثم العودة للصفحة الرئيسية بعد 3 ثواني
            setTimeout(onOrderComplete, 3000); 
        }, 1500); 
    };
    
    // حالة العرض عند نجاح الطلب
    if (isSuccess) {
        return (
            <div className="section-padding checkout-page-container success-state">
                <h3 style={{color: 'var(--secondary-green)', fontSize: '1.8em'}}>✅ تم تأكيد طلبك بنجاح!</h3>
                <p style={{marginTop: '20px', fontSize: '1.1em'}}>
                    تم استلام طلبك وسنقوم بتجهيزه.
                </p>
                <p style={{fontWeight: 'bold', color: 'var(--primary-dark-green)', marginTop: '10px'}}>
                    **تم إرسال فاتورة تفصيلية وإشعار الدفع إلى بريدك الإلكتروني.**
                </p>
                <button className="btn secondary-btn" onClick={onClose} style={{marginTop: '30px'}}>
                    العودة لمتجر نبتة
                </button>
            </div>
        );
    }
    
    // حالة العرض أثناء معالجة الطلب
    if (isProcessing) {
        return (
            <div className="section-padding checkout-page-container processing-state">
                <h3 style={{textAlign: 'center', color: 'var(--primary-dark-green)'}}>جاري معالجة طلبك... الرجاء الانتظار ⏳</h3>
            </div>
        );
    }
    
    // حالة السلة فارغة
    if (cartItems.length === 0) {
         return (
            <div className="section-padding checkout-page-container empty-cart-state">
                <h3 style={{textAlign: 'center', color: '#ff6666'}}>🛒 سلة المشتريات فارغة!</h3>
                <p style={{textAlign: 'center', marginTop: '15px'}}>الرجاء إضافة بعض المنتجات للمتابعة.</p>
                <button className="btn primary-btn" onClick={onClose} style={{display: 'block', margin: '30px auto 0'}}>
                    العودة للمتجر
                </button>
            </div>
        );
    }
    

    // العرض الافتراضي لنموذج الدفع
    return (
        <div className="section-padding checkout-page-container"> 
            <button className="btn secondary-btn back-btn" onClick={onClose} style={{marginBottom: '30px'}}>
                ← إلغاء والعودة للمتجر
            </button>
            
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h3>تأكيد الطلب والمعلومات المطلوبة</h3>

                {/* 🌟 1. تفاصيل السلة/الفاتورة */}
                <div className="order-summary">
                    <h4><i className="fas fa-file-invoice fa-fw"></i> ملخص الطلب</h4>
                    <div className="cart-items-list">
                        <div className="cart-header" style={{fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd'}}>
                            <span>المنتج</span>
                            <span>الكمية</span>
                            <span>السعر الإجمالي</span>
                        </div>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0'}}>
                                <span>{item.name}</span>
                                
                                {/* 🚨 تمكين تغيير الكمية (يمكن تطويره لاحقًا) */}
                                <span>{item.quantity}</span> 
                                
                                <span>{(item.price * item.quantity).toFixed(2)} ر.س</span>
                            </div>
                        ))}
                        <div className="total-row" style={{fontWeight: 'bold', fontSize: '1.2em', display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '2px solid var(--primary-dark-green)', marginTop: '10px'}}>
                            <span>الإجمالي الكلي:</span>
                            <span>{totalAmount.toFixed(2)} ر.س</span>
                        </div>
                    </div>
                </div>

                {/* 🌟 2. معلومات الشحن */}
                <h4><i className="fas fa-map-marker-alt fa-fw"></i> معلومات الشحن</h4>
                <input 
                    type="text" 
                    placeholder="الاسم بالكامل (مطلوب)" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="البريد الإلكتروني (مطلوب للإشعارات)" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                 <input 
                    type="text" 
                    placeholder="رقم الهاتف (لتأكيد الطلب)" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="عنوان الشحن بالتفصيل (الشارع والمدينة)" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                />

                {/* 🌟 3. طريقة الدفع */}
                <h4><i className="fas fa-credit-card fa-fw"></i> طريقة الدفع</h4>
                <div className="payment-options" style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                    <label>
                        <input 
                            type="radio" 
                            value="cash" 
                            checked={paymentMethod === 'cash'} 
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                        />
                        الدفع نقداً عند الاستلام
                    </label>
                    <label>
                         <input 
                            type="radio" 
                            value="card" 
                            checked={paymentMethod === 'card'} 
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                            disabled
                        />
                        بطاقة ائتمانية (قريباً)
                    </label>
                </div>

                <button 
                    type="submit" 
                    className="btn primary-btn" 
                    style={{width: '100%', padding: '15px', fontSize: '1.1em', marginTop: '20px'}}
                >
                    <i className="fas fa-check-circle fa-fw"></i> تأكيد وإرسال الطلب
                </button>
            </form>
        </div>
    );
}

export default CheckoutForm;