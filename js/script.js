// 导航栏滚动效果
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-white', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});

// 移动端菜单
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // 关闭移动菜单（如果打开）
            mobileMenu.classList.add('hidden');
            
            // 滚动到目标位置
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 初始化EmailJS
emailjs.init('YOUR_USER_ID'); // 请替换为您的EmailJS用户ID

// 表单提交处理
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 表单验证
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const emailErrorMessage = document.querySelector('.email-error-message');
    const phoneErrorMessage = document.querySelector('.phone-error-message');
    let isValid = true;
    
    // 邮箱验证
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('border-danger');
        emailErrorMessage.classList.remove('hidden');
        isValid = false;
    } else {
        emailInput.classList.remove('border-danger');
        emailErrorMessage.classList.add('hidden');
    }
    
    // 手机号验证
    const phonePattern = /^1[3-9]\d{9}$/;
    if (!phonePattern.test(phoneInput.value)) {
        phoneInput.classList.add('border-danger');
        phoneErrorMessage.classList.remove('hidden');
        isValid = false;
    } else {
        phoneInput.classList.remove('border-danger');
        phoneErrorMessage.classList.add('hidden');
    }
    
    if (!isValid) return;
    
    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: document.getElementById('message').value
    };
    
    // 更新按钮状态为加载中
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>发送中...</span><i class="fa fa-spinner fa-spin ml-2"></i>';
    
    // 发送邮件
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(function(response) {
            // 成功处理
            showNotification('success', '提交成功', '感谢您的咨询！我们会尽快与您联系。');
            submitBtn.innerHTML = '<span>提交成功</span><i class="fa fa-check ml-2"></i>';
            submitBtn.classList.remove('bg-primary');
            submitBtn.classList.add('bg-success');
            
            // 重置表单
            setTimeout(() => {
                document.getElementById('contactForm').reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>提交咨询</span><i class="fa fa-paper-plane ml-2"></i>';
                submitBtn.classList.remove('bg-success');
                submitBtn.classList.add('bg-primary');
            }, 3000);
        }, function(error) {
            // 失败处理
            showNotification('error', '提交失败', '很抱歉，提交过程中出现了错误，请稍后再试。');
            submitBtn.innerHTML = '<span>提交失败</span><i class="fa fa-times ml-2"></i>';
            submitBtn.classList.remove('bg-primary');
            submitBtn.classList.add('bg-danger');
            
            // 重置按钮
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>提交咨询</span><i class="fa fa-paper-plane ml-2"></i>';
                submitBtn.classList.remove('bg-danger');
                submitBtn.classList.add('bg-primary');
            }, 3000);
        });
});

// 显示通知
function showNotification(type, title, message) {
    const notification = document.getElementById('notification');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationIcon = document.getElementById('notificationIcon');
    
    // 设置通知内容
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    // 设置通知图标和颜色
    if (type === 'success') {
        notificationIcon.innerHTML = '<i class="fa fa-check-circle text-success"></i>';
    } else if (type === 'error') {
        notificationIcon.innerHTML = '<i class="fa fa-exclamation-circle text-danger"></i>';
    } else if (type === 'warning') {
        notificationIcon.innerHTML = '<i class="fa fa-exclamation-triangle text-warning"></i>';
    }
    
    // 显示通知
    notification.classList.remove('translate-x-full');
    
    // 3秒后自动关闭
    setTimeout(() => {
        notification.classList.add('translate-x-full');
    }, 5000);
}

// 关闭通知
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').classList.add('translate-x-full');
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