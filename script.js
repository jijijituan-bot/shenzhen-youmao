// 导航栏滚动效果
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 导航链接激活状态
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 首页轮播功能
const initHeroSlider = () => {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    // 创建指示点
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };
    
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };
    
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };
    
    const goToSlide = (index) => {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoPlay();
    };
    
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    };
    
    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };
    
    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };
    
    // 按钮事件
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    // 鼠标悬停暂停
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
    
    // 启动自动播放
    startAutoPlay();
};

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 移动端菜单
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        if (nav.style.display === 'flex') {
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.flexDirection = 'column';
            nav.style.background = 'white';
            nav.style.padding = '1rem';
            nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        }
    });
}

// 表单提交
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '提交成功！';
        submitBtn.style.background = '#28a745';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// 滚动动画
const observeElements = () => {
    const elements = document.querySelectorAll('.product-card, .app-card, .advantage-item, .cert-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(element);
    });
};

// 应用场景展示图滚动动画
const observeShowcaseImage = () => {
    const showcaseImage = document.querySelector('.showcase-image');
    
    if (showcaseImage) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        showcaseImage.style.animation = 'none';
        observer.observe(showcaseImage);
    }
};

// 页面加载完成后初始化
window.addEventListener('load', () => {
    initHeroSlider();
    observeElements();
    observeShowcaseImage();
});

// 证书点击放大
const certItems = document.querySelectorAll('.cert-item');
const body = document.body;

const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
    `;
    
    lightbox.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90vh;">
            <button style="position: absolute; top: -50px; right: 0; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.5); color: white; font-size: 2rem; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s;" class="lightbox-close">&times;</button>
            <img src="" alt="" style="max-width: 100%; max-height: 75vh; border-radius: 8px; box-shadow: 0 10px 50px rgba(0,0,0,0.5);" class="lightbox-img">
        </div>
    `;
    
    body.appendChild(lightbox);
    return lightbox;
};

let lightbox = null;

certItems.forEach(item => {
    item.addEventListener('click', () => {
        if (!lightbox) {
            lightbox = createLightbox();
        }
        
        const img = item.querySelector('img');
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        lightbox.style.opacity = '1';
        lightbox.style.visibility = 'visible';
        body.style.overflow = 'hidden';
    });
});

body.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox') || 
        e.target.classList.contains('lightbox-close')) {
        if (lightbox) {
            lightbox.style.opacity = '0';
            lightbox.style.visibility = 'hidden';
            body.style.overflow = '';
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox) {
        lightbox.style.opacity = '0';
        lightbox.style.visibility = 'hidden';
        body.style.overflow = '';
    }
});


// 企业优势区域视差滚动效果
const initParallax = () => {
    const showcaseContainer = document.getElementById('showcaseImage');
    const advantagesSection = document.querySelector('.advantages-section');
    
    if (!showcaseContainer || !advantagesSection) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // 应用领域和企业优势的位置
        const applicationsSection = document.querySelector('#applications');
        const applicationsTop = applicationsSection ? applicationsSection.offsetTop : 0;
        const applicationsHeight = applicationsSection ? applicationsSection.clientHeight : 0;
        const applicationsBottom = applicationsTop + applicationsHeight;
        
        const advantagesTop = advantagesSection.offsetTop;
        const windowHeight = window.innerHeight;
        
        // 当企业优势区域进入视口时，开始移动照片
        if (scrollTop >= applicationsBottom) {
            // 计算照片应该移动的距离
            // 当用户滚动到企业优势时，照片逐渐向上移动并隐藏
            const moveDistance = Math.min(
                scrollTop - applicationsBottom,
                showcaseContainer.clientHeight + 100
            );
            
            // 透明度：随着上移，逐渐变透明
            const opacity = Math.max(0, 1 - (moveDistance / showcaseContainer.clientHeight));
            
            showcaseContainer.style.transform = `translateY(-${moveDistance}px)`;
            showcaseContainer.style.opacity = opacity;
        } else {
            // 还未滚动到，照片保持原位
            showcaseContainer.style.transform = 'translateY(0)';
            showcaseContainer.style.opacity = '1';
        }
    });
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    observeElements();
    initParallax();
});
