// 滚动导航栏效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.color = '#333';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.color = 'white';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 表单提交处理
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('感谢您的咨询！我们会尽快与您联系。');
    this.reset();
});

// 统计数字动画
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        const finalNumber = number.textContent;
        const numericValue = parseInt(finalNumber.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = numericValue / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                number.textContent = finalNumber;
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current) + (finalNumber.includes('%') ? '%' : finalNumber.includes('+') ? '+' : '');
            }
        }, 20);
    });
}

// 监听滚动到统计区域
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.querySelector('.stats'));