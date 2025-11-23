import React, { useState, useEffect } from 'react';
// استيراد المكونات
import Header from './components/Header';
import HeroBanner from './components/HeroBanner'; 
import CollectionsSection from './components/CollectionsSection'; 
import ProductList from './components/ProductList';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer'; 
import CheckoutForm from './components/CheckoutForm'; 
import ProductDetail from './components/ProductDetail'; 
import Cart from './components/Cart'; 
// المكونات الجديدة
import AboutUsSection from './components/AboutUsSection'; 
import ContactForm from './components/ContactForm'; 

// استيراد الستايلات 👈 هذا يضمن الالتزام بالتصميم
import './assets/css/components.css'; 
import './assets/css/style.css'; 



// 1. 📋 بيانات وهمية للمنتجات (تم تحديث خاصية الصورة إلى 'img' لتوحيدها)
const initialProducts = [
    { id: 1, name: "نبتة Monstera Deliciosa", price: 150.00, img:'product-1.jpg', description: "نبتة المونستيرا هي خيار مثالي لإضافة لمسة استوائية إلى ديكورك. مشهورة بأوراقها الكبيرة والمتقطعة.", rating: 5, reviews: 120 },
    { id: 2, name: "نبتة Zamioculcas (ZZ)", price: 95.50, img:'product-2.jpg', description: "نبتة الزاميولكاس، المعروفة بـ ZZ، هي نبتة مقاومة وتتحمل الإهمال، مثالية للمكاتب والمنازل.", rating: 4, reviews: 85 },
    { id: 3, name: "مجموعة أدوات زراعة فاخرة", price: 75.99,img: 'product-3.jpg', description: "مجموعة أدوات زراعة متكاملة من الستانلس ستيل المقاوم للصدأ.", rating: 4, reviews: 55 },
    { id: 4, name: "نبتة Sansevieria (جلد النمر)", price: 110.00, img: 'product-4.jpg', description: "نبتة جلد النمر تنقي الهواء وتضيف مظهراً عمودياً أنيقاً للمساحة.", rating: 5, reviews: 90 },
    { id: 5, name: "وعاء سيراميك أبيض", price: 45.00, img: 'product-5.jpg', description: "وعاء سيراميك فاخر بتصميم مينيمالي، مثالي لأي نوع من النباتات.", rating: 4, reviews: 30 },
    { id: 6, name: "نبتة Ficus Lyrata (كمان)", price: 220.00, img: 'product-6.jpg', description: "نبتة الكمان (Fiddle Leaf Fig) هي نبتة داخلية عصرية بأوراقها الكبيرة والدرامية.", rating: 5, reviews: 75 },
    { id: 7, name: "تربة عضوية محسنة", price: 30.00, img: 'product-7.jpg', description: "تربة غنية بالمغذيات العضوية لضمان نمو صحي لنباتاتك الداخلية.", rating: 4, reviews: 45 },
    { id: 8, name: "أصيص خرساني رمادي", price: 60.00, img: 'product-8.jpg', description: "أصيص خرساني عصري، ثقيل ومتين، يضيف طابعاً صناعياً أنيقاً.", rating: 5, reviews: 20 },
];

// 2. 📋 بيانات وهمية للمجموعات (بخاصيتي title و img)
const initialCollections = [
    { id: 101, title: "نباتات داخلية", description: "مجموعة مختارة لتنقية الهواء", img: 'collection-1.jpg', targetView: 'products' },
    { id: 102, title: "أدوات ومستلزمات", description: "كل ما تحتاجه للعناية بنباتاتك", img: 'collection-2.jpg', targetView: 'products' },
    { id: 103, title: "أصص وديكورات", description: "لمسة جمالية لكل زاوية", img: 'collection-3.jpg', targetView: 'products' },
];

const getInitialState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error("Error parsing localStorage key:", key, error);
            localStorage.removeItem(key); 
            return defaultValue;
        }
    }
    return defaultValue;
};


function App() {
    const [currentView, setCurrentView] = useState(() => getInitialState('currentView', 'home'));
    const [cartItems, setCartItems] = useState(() => getInitialState('cartItems', []));
    const [cartCount, setCartCount] = useState(() => getInitialState('cartCount', 0));
    const [allProducts] = useState(initialProducts); 
    const [collections] = useState(initialCollections); 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', JSON.stringify(cartCount));
        localStorage.setItem('currentView', JSON.stringify(currentView));
    }, [cartItems, cartCount, currentView]);


    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setCurrentView('productDetail');
    };

    const handleAddToCart = (product) => {
        const quantityToAdd = 1; 
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantityToAdd;
                return updatedItems;
            } else {
                return [...prevItems, {...product, quantity: quantityToAdd}];
            }
        });
        setCartCount(prevCount => prevCount + quantityToAdd);
    };


    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return handleRemoveItem(id); 
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            const newCartCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
            setCartCount(newCartCount);
            return updatedItems;
        });
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => {
            const itemToRemove = prevItems.find(item => item.id === id);
            if (!itemToRemove) return prevItems;
            const updatedItems = prevItems.filter(item => item.id !== id);
            const newCartCount = cartCount - itemToRemove.quantity;
            setCartCount(newCartCount < 0 ? 0 : newCartCount);
            return updatedItems;
        });
    };
    
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // دالة عرض المحتوى بناءً على currentView (Routing)
    const renderContent = () => {
        if (currentView === 'productDetail' && !selectedProduct) {
             return (
                <main style={{ paddingTop: '100px', textAlign: 'center' }}>
                    <div className="section-padding">
                        <h2>المنتج غير محدد أو ضاعت بياناته.</h2>
                        <button className="btn primary-btn" onClick={() => setCurrentView('products')}>العودة للمنتجات</button>
                    </div>
                </main>
             );
        }

        switch (currentView) {
            case 'home':
                return (
                    <>
                        <main style={{ marginTop: '100px' }}> 
                            <HeroBanner onNavigate={handleNavigate} /> 
                            
                            {/* 1. قسم المجموعات */}
                            <CollectionsSection collections={collections} onNavigate={handleNavigate} /> 
                            
                            {/* 2. قسم نبذة عنا المصغر (About Us) - تم إضافته ليكون في الرئيسية */}
                            <AboutUsSection onNavigate={handleNavigate} isMini={true} />
                            
                            {/* 3. قائمة المنتجات (الأكثر طلباً) */}
                            <ProductList 
                                products={allProducts.slice(0, 4)} 
                                onProductClick={handleProductClick} 
                                onAddToCart={handleAddToCart}
                                title="🌱 الأكثر طلباً" // عنوان مميز
                            />
                            
                            {/* 4. قسم تواصل معنا المصغر (Contact Form) - تم إضافته ليكون في الرئيسية */}
                            <ContactForm isMini={true} onNavigate={handleNavigate} />
                            
                            {/* 5. قسم العرض الأخير (Call to Action) */}
                            <CallToAction />
                        </main>
                    </>
                );
            case 'products':
                return (
                    <main style={{ marginTop: '100px' }} id="products"> 
                        <div className="section-padding">
                             <h2 className="section-title" style={{marginBottom: '30px', textAlign: 'center'}}>كل المنتجات المتوفرة</h2>
                            <ProductList 
                                products={filteredProducts} 
                                onProductClick={handleProductClick} 
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    </main>
                );
            // 🟢 صفحة من نحن الكاملة
            case 'about':
                return (
                    <main style={{ paddingTop: '100px' }} id="about">
                        {/* النسخة الكاملة */}
                        <AboutUsSection onNavigate={handleNavigate} isMini={false} />
                    </main>
                );
            
            // 🟢 صفحة تواصل معنا الكاملة
            case 'contact':
                return (
                    <main style={{ paddingTop: '100px' }} id="contact">
                        {/* النسخة الكاملة */}
                        <ContactForm isMini={false} onNavigate={handleNavigate} />
                    </main>
                );
            case 'productDetail':
                return (
                    <main style={{ paddingTop: '100px' }} id="productDetail">
                        <ProductDetail 
                            product={selectedProduct} 
                            onBack={() => setCurrentView('products')} 
                            onAddToCart={handleAddToCart}
                        />
                    </main>
                );
            case 'cart':
                return (
                    <main style={{ paddingTop: '100px' }} id="cart">
                        <Cart 
                            cartItems={cartItems} 
                            onCheckout={() => setCurrentView('checkout')} 
                            onQuantityChange={handleQuantityChange} 
                            onRemoveItem={handleRemoveItem} 
                            onNavigate={handleNavigate}
                            onProductClick={handleProductClick}
                        />
                    </main>
                );
            case 'checkout':
                return (
                    <main style={{ paddingTop: '100px' }} id="checkout">
                        <CheckoutForm 
                            cartItems={cartItems} 
                            total={cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                            onNavigate={handleNavigate}
                        />
                    </main>
                );
            default:
                return (
                    <main style={{ marginTop: '100px', textAlign: 'center' }}>
                        <h1>404 | الصفحة غير موجودة</h1>
                    </main>
                );
        }
    };


    return (
        <div className="App" dir="rtl">
            <Header 
                cartCount={cartCount}
                onCartClick={() => handleNavigate('cart')}
                onNavigate={handleNavigate}
                onSearchChange={setSearchTerm}
                allProducts={allProducts}
                onProductClick={handleProductClick}
            />
            
            {renderContent()}
            
            <Footer />
        </div>
    );
}

export default App;