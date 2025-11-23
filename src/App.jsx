
// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CollectionsSection from './components/CollectionsSection';
import ProductList from './components/ProductList';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import CheckoutForm from './components/CheckoutForm'; 
import ProductDetail from './components/ProductDetail'; 
import '../src/assets/css/components.css'; 
import '../src/assets/css/style.css'; 
 

// محاكاة لبيانات المنتجات (MOCK_PRODUCTS_API)
const MOCK_PRODUCTS_API = [
    { id: 1, name: "نبتة مونستيرا", price: 90.00, review: 4.8, img: "p-monstera.jpg", description: "نبتة داخلية شهيرة بأوراقها الضخمة المثقوبة، مثالية لإضافة لمسة استوائية إلى منزلك. تحتاج إلى إضاءة ساطعة غير مباشرة."},
    { id: 2, name: "نبتة زاميا", price: 75.00, review: 4.5, img: "p-zamioculcas.jpg", description: "نبتة قوية جداً تتحمل الظروف القاسية، وتعتبر من أفضل الخيارات للمبتدئين أو لمن يبحث عن نبتة لا تحتاج للكثير من العناية. يمكن وضعها في إضاءة خافتة."},
    { id: 3, name: "نبتة فيكس ليراتا", price: 120.00, review: 4.9, img: "p-ficus.jpg", description: "شجرة التين الكمان، مشهورة بأوراقها الكبيرة والجميلة التي تشبه آلة الكمان. تحتاج إلى إضاءة ساطعة للحفاظ على شكلها المكتنز."},
    { id: 4, name: "نبتة السجادة", price: 35.00, review: 4.2, img: "p-coleus.jpg", description: "نبتة زينة ذات ألوان زاهية ومتنوعة، رائعة لإضافة البهجة. تحتاج إلى تقليم مستمر للحفاظ على شكلها."},
    { id: 5, name: "سراخس بوسطن", price: 60.00, review: 4.6, img: "p-fern.jpg", description: "نبتة هوائية محبة للرطوبة، تضفي جمالاً طبيعياً على أي مكان. تحتاج إلى رش أوراقها بالماء بشكل دوري."},
    { id: 6, name: "صبار الألوفيرا", price: 45.00, review: 4.7, img: "p-aloe.jpg", description: "نبتة طبية ذات فوائد عديدة، وسهلة العناية. يجب تعريضها لأشعة الشمس المباشرة أو الإضاءة القوية."},
    { id: 7, name: "بذور الريحان", price: 20.00, review: 4.0, img: "p-seeds.jpg", description: "بذور عالية الجودة لزراعة الريحان الطازج في المنزل. مثالية للمطبخ."},
    { id: 8, name: "أصيص خشب", price: 50.00, review: 4.5, img: "p-pot.jpg", description: "أصيص أنيق مصنوع يدوياً من الخشب الطبيعي، يضيف لمسة دافئة وعصرية لنباتك."},
];


function App() {
  const [allProducts, setAllProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);   
    
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]); 
  
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  
  const [isCheckoutPageOpen, setIsCheckoutPageOpen] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);



  // 1. العودة لأعلى الصفحة عند التنقل لصفحة المنتج أو الدفع
  useEffect(() => {
    if (selectedProduct || isCheckoutPageOpen) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  }, [selectedProduct, isCheckoutPageOpen]);

  // 2. تحميل المنتجات والبحث الفوري
  useEffect(() => {
    setAllProducts(MOCK_PRODUCTS_API);
    setFilteredProducts(MOCK_PRODUCTS_API); 
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
        // 🚨 هذا الـ useEffect مسؤول عن تصفية القائمة الرئيسية المعروضة بالكامل (وليست القائمة المنسدلة للبحث الفوري)
        const results = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
        
        // إغلاق أي صفحة فرعية عند بدء البحث في القائمة الرئيسية
        if (searchTerm.length > 0) {
             setSelectedProduct(null);
             setIsCheckoutPageOpen(false);
        }
    }
  }, [searchTerm, allProducts]); 
  




  // 3. 🚨 دالة جديدة: للتحكم في التنقل من روابط الناف (ضمان العودة من الصفحات الفرعية)
  const handleNavClick = (targetId) => {
    setSelectedProduct(null);
    setIsCheckoutPageOpen(false);

    // الانتقال للقسم المطلوب بسلاسة
    if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
  };

  const handleViewProduct = (product) => {
      setSelectedProduct(product); 
      setIsCheckoutPageOpen(false); 
  };

  const handleBackToShop = () => {
      setSelectedProduct(null);
      setIsCheckoutPageOpen(false); 
  };
    
  const handleOpenCheckout = () => {
    setSelectedProduct(null); 
    setIsCheckoutPageOpen(true); 
  };


// 🚨 الدالة الجديدة والمعدلة لمنطق السلة (يتم إضافة 1 كل مرة وتجميعها)
const handleAddToCart = (product, quantity = 1) => {
    // نضمن أن الكمية المضافة هي 1 في كل ضغطة ما لم يتم تمريرها بشكل صريح (وهو ما لا يحدث الآن)
    const quantityToAdd = 1; 

    setCartItems(prevItems => {
        // 1. البحث عن المنتج في السلة
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            // 2. إذا كان المنتج موجوداً: زيادة الكمية بـ 1
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += quantityToAdd;
            return updatedItems;
        } else {
            // 3. إذا كان المنتج جديداً: إضافته للتو بكمية 1
            return [
                ...prevItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                    quantity: quantityToAdd, // إضافة الكمية 1
                }
            ];
        }
    });
    // زيادة العداد الإجمالي للسلة المعروض في الهيدر
    setCartCount(prevCount => prevCount + quantityToAdd);
    
    // يمكنك إضافة رسالة تأكيد هنا
    console.log(`تم إضافة ${product.name}. الكمية الحالية: ${product.quantity + 1}`); 
};


  // const handleAddToCart = (productToAdd) => {
  //   const existingItem = cartItems.find(item => item.id === productToAdd.id);
  //   if (existingItem) {
  //     setCartItems(
  //       cartItems.map(item =>
  //         item.id === productToAdd.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
  //   }
  // };


// 🚨 تأكدي من تمرير الدوال الجديدة في دالة renderContent (أو مكان عرض Cart)
const renderContent = () => {
    switch (currentView) {
        case 'cart':
            return (
                <Cart 
                    cartItems={cartItems} 
                    onCheckout={() => setCurrentView('checkout')} 
                    onQuantityChange={handleQuantityChange} // 🚨 الدالة الجديدة
                    onRemoveItem={handleRemoveItem} // 🚨 الدالة الجديدة
                    onNavigate={handleNavigate}
                />
            );
        // ... (باقي الحالات)
    }
};

  // 🚨 دالة لتغيير كمية المنتج في السلة
const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prevItems => {
        const updatedItems = prevItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        
        // إعادة حساب العدد الإجمالي للـ cartCount
        const newCartCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
        setCartCount(newCartCount);

        return updatedItems;
    });
};

// 🚨 دالة لحذف منتج بالكامل من السلة
const handleRemoveItem = (id) => {
    setCartItems(prevItems => {
        const itemToRemove = prevItems.find(item => item.id === id);
        
        if (!itemToRemove) return prevItems;

        const updatedItems = prevItems.filter(item => item.id !== id);
        
        // تحديث العداد الإجمالي للسلة
        const newCartCount = cartCount - itemToRemove.quantity;
        setCartCount(newCartCount);

        // إذا كانت السلة فارغة، ننتقل لعرض صفحة المنتجات (اختياري)
        if (updatedItems.length === 0) {
             setCurrentView('products');
        }
        
        return updatedItems;
    });
};


  const handleOrderComplete = () => {
    setCartItems([]); 
    setIsCheckoutPageOpen(false); 
  };

  const collections = [
    { id: 'c1', title: 'الأكثر مبيعاً', img: 'coll1.jpg' },
    { id: 'c2', title: 'للمبتدئين', img: 'coll2.jpg' },
    { id: 'c3', title: 'الأدوات', img: 'coll3.jpg' },
  ];
  
  return (
    <div className="app-container">
      {/* 🚨 تمرير onNavigate و allProducts و handleViewProduct (كـ onProductClick) إلى Header */}
      <Header 
        cartCount={cartItems.length} 
        onSearchChange={setSearchTerm} 
        onCartClick={handleOpenCheckout}
        onNavigate={handleNavClick} 
        allProducts={allProducts} 
        onProductClick={handleViewProduct}
      /> 
      
      <main>
          {isCheckoutPageOpen ? (
              <CheckoutForm 
                cartItems={cartItems} 
                totalAmount={totalAmount} 
                onOrderComplete={handleOrderComplete}
                onClose={handleBackToShop} 
              />
          ) : selectedProduct ? (
              <ProductDetail 
                  product={selectedProduct} 
                  onBack={handleBackToShop} 
                  onAddToCart={handleAddToCart}
                  allProducts={allProducts} 
                  onViewProduct={handleViewProduct}
              />
          ) : (
              <>
                {/* الأقسام هنا تحتاج لـ id لتعمل روابط الناف بشكل سليم */}
                <div id="home"> 
                    <HeroBanner />
                </div>
                
                <CollectionsSection collections={collections} />
                
                <section id="shop" className="section-padding featured-products-section"> 
                  <h2 className="section-title">🪴 اكتشف مجموعتنا</h2>
                  
                  {isLoading ? (
                      <p style={{textAlign: 'center', fontSize: '1.5em', color: '#59866F'}}>... جاري تحميل المنتجات</p>
                  ) : (
                      <ProductList 
                          products={filteredProducts} 
                          onAddToCart={handleAddToCart} 
                          onViewProduct={handleViewProduct}
                      />
                  )}
                </section>

                <CallToAction 
                  title="نصائح للعناية بنباتاتك"
                  subtitle="دليلك خطوة بخطوة لنمو صحي ومزدهر"
                  buttonText="اكتشف الدليل"
                  image="cta-plant.jpg"
                />

                <section className="section-padding trending-products-section">
                  <h2 className="section-title green-title">🌵 الأكثر طلباً</h2>
                  <ProductList 
                      products={filteredProducts.slice(0, 4)} 
                      onAddToCart={handleAddToCart}
                      onViewProduct={handleViewProduct}
                  />
                </section>
                
                {/* 🚨 قسم المدونة يحتاج ID */}
                <section id="blog" style={{minHeight: '200px', textAlign: 'center', padding: '50px 20px', backgroundColor: '#f9f9f9'}}>
                    <h2 className="section-title"><i className="fas fa-edit fa-fw"></i> مدونة نبتة</h2>
                    <p>مقالات ونصائح للحفاظ على نباتاتك المنزلية.</p>
                </section>

                {/* 🚨 قسم التواصل يحتاج ID */}
                <section id="contact" style={{minHeight: '200px', textAlign: 'center', padding: '50px 20px'}}>
                    <h2 className="section-title"><i className="fas fa-phone-alt fa-fw"></i> تواصل معنا</h2>
                    <p>نحن هنا للإجابة على جميع استفساراتك.</p>
                </section>
              </>
          )}
      </main>

      <Footer />
    </div>
  );
}

export default App;