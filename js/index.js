// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // 初始化轮播图
    function initSlider() {
        slides.forEach((slide, index) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });
        
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '2';
    }
    
    // 切换到下一张幻灯片
    function nextSlide() {
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.zIndex = '1';
        
        currentSlide = (currentSlide + 1) % totalSlides;
        
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '2';
    }
    
    // 切换到上一张幻灯片
    function prevSlide() {
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.zIndex = '1';
        
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '2';
    }
    
    // 按钮事件监听
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // 自动轮播
    let slideInterval = setInterval(nextSlide, 2000);
    
    // 鼠标悬停时暂停轮播
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // 初始化
    initSlider();
    
    // 加载商品数据
    loadProducts();
});

// 加载商品数据
function loadProducts() {
    // 这里应该是从API获取数据，现在我们使用模拟数据
    const products = [
        {
            id: 1,
            title: '无线蓝牙耳机',
            price: 199,
            oldPrice: 299,
            image: 'picture/8.jpg',
            rating: 4,
            badge: '热卖'
        },
        {
            id: 2,
            title: '智能手表',
            price: 599,
            oldPrice: 799,
            image: 'picture/4.jpg',
            rating: 5,
            badge: '新品'
        },
        {
            id: 3,
            title: '便携式充电宝',
            price: 99,
            oldPrice: 129,
            image: 'picture/9.jpg',
            rating: 3,
            badge: '促销'
        },
        {
            id: 4,
            title: '高清网络摄像头',
            price: 249,
            oldPrice: 299,
            image: 'picture/10.jpg',
            rating: 4,
            badge: ''
        },
        {
            id: 5,
            title: '机械键盘',
            price: 399,
            oldPrice: 499,
            image: 'picture/11.jpg',
            rating: 5,
            badge: '限量'
        },
        {
            id: 6,
            title: '无线鼠标',
            price: 89,
            oldPrice: 129,
            image: 'picture/12.jpg',
            rating: 4,
            badge: ''
        }
    ];
    
    const productsGrid = document.querySelector('.products-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<span class="product-badge">${product.badge}</span>`;
        }
        
        let ratingHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                ratingHTML += '<i class="fas fa-star"></i>';
            } else {
                ratingHTML += '<i class="far fa-star"></i>';
            }
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                ${badgeHTML}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">¥${product.price}</span>
                    <span class="old-price">¥${product.oldPrice}</span>
                </div>
                <div class="product-rating">
                    ${ratingHTML}
                </div>
                <button class="add-to-cart" data-id="${product.id}">加入购物车</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // 添加购物车事件监听
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// 加入购物车功能
function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    // 这里应该是发送到服务器的AJAX请求
    console.log(`产品 ${productId} 已添加到购物车`);
    
    // 显示通知
    showNotification('商品已成功添加到购物车');
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 添加样式
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#2ecc71';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s forwards';
    
    // 3秒后消失
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// 添加到CSS中的动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
