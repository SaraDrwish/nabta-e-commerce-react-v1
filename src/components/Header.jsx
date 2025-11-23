import React, { useState, useEffect, useRef } from 'react';

import '../assets/css/components.css';  
import '../assets/css/style.css';  

function Header({ cartCount, onSearchChange, onCartClick, onNavigate, allProducts, onProductClick }) {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const searchRef = useRef(null);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // 🚨 دالة معالجة البحث - تم تعديل منطق الفلترة ليتطابق مع (يبدأ بـ) أو (يحتوي على)
    const handleInputChange = (event) => {
        const term = event.target.value.trim();
        setLocalSearchTerm(event.target.value); // نحتفظ بالنص الأصلي في الحقل

        if (term.length > 0) {
            const lowerCaseTerm = term.toLowerCase();
            
            const filtered = allProducts
                .filter(product => {
                    // 🚨 منطق الفلترة الجديد: نبحث عما يبدأ بنفس الكلمة أو يحتوي عليها
                    const productName = product.name.toLowerCase();
                    return productName.startsWith(lowerCaseTerm) || productName.includes(lowerCaseTerm);
                })
                // 🚨 ترتيب النتائج: التي تبدأ بالحرف أولاً
                .sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    const startsWithA = nameA.startsWith(lowerCaseTerm);
                    const startsWithB = nameB.startsWith(lowerCaseTerm);

                    if (startsWithA && !startsWithB) return -1;
                    if (!startsWithA && startsWithB) return 1;
                    return 0;
                });
            
            setSearchResults(filtered);
            setIsSearchActive(true); 
            
        } else {
            setIsSearchActive(false);
            setSearchResults([]);
        }
        
        if (onSearchChange) {
            onSearchChange(term);
        }
    };
    
    const handleResultClick = (product) => {
        if (onProductClick) {
            onProductClick(product); 
        }
        setIsSearchActive(false); 
        setLocalSearchTerm(''); 
    };

    const handleSearchIconClick = () => {
        setIsSearchActive(false);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault(); 
        if (onNavigate) {
            onNavigate(targetId); 
        }
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    // useEffect لإدارة النقر خارج منطقة البحث والقائمة
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchActive(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target) && event.target.className !== 'icon-btn menu-toggle-btn' && event.target.parentElement.className !== 'icon-btn menu-toggle-btn') {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            {/* الشريط العلوي */}
            <div className="top-strip">
                <p><i className="fas fa-shipping-fast"></i> شحن سريع ومجاني للطلبات فوق 300 ر.س</p>
            </div>
            
            <header className="main-header">
                
                {/* أيقونة المنيو للموبايل */}
                <button aria-label="قائمة التنقل" className="icon-btn menu-toggle-btn" onClick={toggleMenu}>
                    <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </button>
                
                {/* الشعار */}
                <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
                    نبتة
                </a>

                {/* قائمة التنقل */}
                <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                    <ul>
                        <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>الرئيسية</a></li>
                        <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')}>المنتجات</a></li>
                        <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>من نحن</a></li>
                        <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>اتصل بنا</a></li>
                    </ul>
                </nav>

                <div className="header-actions">
                    {/* شريط البحث مع قائمة النتائج المنسدلة */}
                    <div className="search-bar" ref={searchRef}>
                        <input 
                            type="text" 
                            placeholder="ابحث عن نبتة أو أداة..." 
                            value={localSearchTerm}
                            onChange={handleInputChange} 
                        />
                        <button aria-label="بحث" className="fa-icon-btn" onClick={handleSearchIconClick}>
                            <i className="fas fa-search"></i>
                        </button> 
                        
                        {/* قائمة نتائج البحث الفوري */}
                        {isSearchActive && (
                            <div className="search-results-dropdown">
                                {searchResults.length > 0 ? (
                                    searchResults.map(product => (
                                        <div 
                                            key={product.id} 
                                            className="search-result-item"
                                            onClick={() => handleResultClick(product)}
                                        >
                                            <img src={`/images/${product.img}`} alt={product.name} /> 
                                            <span>{product.name}</span>
                                            <span className="price">{product.price.toFixed(2)} ر.س</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-results">
                                        لا توجد نتائج لـ **"{localSearchTerm}"**
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* أيقونة السلة */}
                    <div className="icon-group">
                        <button aria-label="السلة" className="icon-btn cart-btn" onClick={onCartClick}>
                            <i className="fas fa-shopping-cart"></i>
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;