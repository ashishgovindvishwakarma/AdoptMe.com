// ==================== DATA ====================
    const recentDonors = [
      { name: "Priya Sharma", amount: 2000, date: "2 hours ago", initial: "PS" },
      { name: "Anonymous", amount: 5000, date: "5 hours ago", initial: "A" },
      { name: "Rahul Gupta", amount: 1000, date: "1 day ago", initial: "RG" },
      { name: "Sneha Patel", amount: 3000, date: "1 day ago", initial: "SP" },
      { name: "Amit Kumar", amount: 1500, date: "2 days ago", initial: "AK" },
      { name: "Meera Joshi", amount: 2500, date: "3 days ago", initial: "MJ" }
    ];

    // ==================== STATE ====================
    let selectedAmount = 1000;
    let selectedType = 'one-time';
    let selectedPayment = 'upi';
    let selectedGift = 'general';

    // ==================== DOM ELEMENTS ====================
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const donationForm = document.getElementById('donationForm');
    const notification = document.getElementById('notification');
    const notificationClose = document.getElementById('notificationClose');
    const customAmountInput = document.getElementById('customAmount');
    const anonymousToggle = document.getElementById('anonymous');

    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', () => {
      renderDonors();
      initScrollReveal();
      animateStats();
      animateProgressBar();
      updateSummary();
    });

    // ==================== THEME TOGGLE ====================
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const icon = themeToggle.querySelector('i');
      if (document.body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });

    // ==================== MOBILE MENU ====================
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
    });

    menuOverlay.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
    });

    // ==================== AMOUNT SELECTION ====================
    document.querySelectorAll('.amount-option').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.amount-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        selectedAmount = parseInt(option.dataset.amount);
        customAmountInput.value = '';
        updateSummary();
      });
    });

    document.querySelectorAll('.impact-card').forEach(card => {
      card.addEventListener('click', () => {
        const amount = parseInt(card.dataset.amount);
        document.querySelectorAll('.impact-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        document.querySelectorAll('.amount-option').forEach(o => {
          o.classList.remove('active');
          if (parseInt(o.dataset.amount) === amount) {
            o.classList.add('active');
          }
        });
        selectedAmount = amount;
        customAmountInput.value = '';
        updateSummary();
      });
    });

    customAmountInput.addEventListener('input', () => {
      if (customAmountInput.value) {
        document.querySelectorAll('.amount-option').forEach(o => o.classList.remove('active'));
        document.querySelectorAll('.impact-card').forEach(c => c.classList.remove('selected'));
        selectedAmount = parseInt(customAmountInput.value) || 0;
        updateSummary();
      }
    });

    // ==================== DONATION TYPE ====================
    document.querySelectorAll('.donation-type-option').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.donation-type-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        selectedType = option.dataset.type;
        updateSummary();
      });
    });

    // ==================== PAYMENT METHOD ====================
    document.querySelectorAll('.payment-method').forEach(method => {
      method.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        method.classList.add('active');
        selectedPayment = method.dataset.method;
        updateSummary();
      });
    });

    // ==================== GIFT OPTIONS ====================
    document.querySelectorAll('.gift-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.gift-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedGift = card.dataset.gift;
        showNotification('success', 'Gift Selected', `Your donation will go to ${card.querySelector('h3').textContent}`);
      });
    });

    // ==================== ANONYMOUS TOGGLE ====================
    anonymousToggle.addEventListener('change', () => {
      const nameInput = document.getElementById('donorName');
      if (anonymousToggle.checked) {
        nameInput.placeholder = 'Anonymous Donor';
        nameInput.value = 'Anonymous Donor';
        nameInput.disabled = true;
      } else {
        nameInput.placeholder = 'Your full name';
        nameInput.value = '';
        nameInput.disabled = false;
      }
    });

    // ==================== UPDATE SUMMARY ====================
    function updateSummary() {
      const formattedAmount = `Rs. ${selectedAmount.toLocaleString('en-IN')}`;
      document.getElementById('summaryAmount').textContent = formattedAmount;
      document.getElementById('summaryTotal').textContent = formattedAmount;
      
      const typeText = selectedType === 'one-time' ? 'One-time' : 'Monthly Recurring';
      document.getElementById('summaryType').textContent = typeText;
      
      const paymentNames = {
        'upi': 'UPI / GPay',
        'card': 'Credit/Debit Card',
        'netbanking': 'Net Banking',
        'wallet': 'Wallets'
      };
      document.getElementById('summaryPayment').textContent = paymentNames[selectedPayment];
      
      const taxBenefit = Math.round(selectedAmount * 0.5);
      document.getElementById('summaryTax').textContent = `Rs. ${taxBenefit.toLocaleString('en-IN')}`;
    }

    // ==================== FORM SUBMISSION ====================
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (selectedAmount < 100) {
        showNotification('error', 'Minimum Amount', 'Minimum donation amount is Rs. 100');
        return;
      }

      const donorEmail = document.getElementById('donorEmail').value;
      const donorPhone = document.getElementById('donorPhone').value;

      if (!donorEmail || !donorPhone) {
        showNotification('error', 'Missing Information', 'Please fill in all required fields');
        return;
      }

      // Generate transaction ID
      const txnId = 'TXN-' + Date.now().toString().slice(-10);
      
      // Show success modal
      document.getElementById('modalAmount').textContent = `Rs. ${selectedAmount.toLocaleString('en-IN')}`;
      document.getElementById('modalTransaction').textContent = txnId;
      document.getElementById('successModal').classList.add('show');
      
      // Reset form
      donationForm.reset();
      document.querySelectorAll('.amount-option').forEach(o => o.classList.remove('active'));
      document.querySelector('.amount-option[data-amount="1000"]').classList.add('active');
      selectedAmount = 1000;
      updateSummary();
    });

    // ==================== RENDER DONORS ====================
    function renderDonors() {
      const donorList = document.getElementById('donorList');
      donorList.innerHTML = '';
      
      recentDonors.forEach(donor => {
        const item = document.createElement('div');
        item.className = 'donor-item';
        item.innerHTML = `
          <div class="donor-avatar">${donor.initial}</div>
          <div class="donor-info">
            <div class="donor-name">${donor.name}</div>
            <div class="donor-date">${donor.date}</div>
          </div>
          <div class="donor-amount">Rs. ${donor.amount.toLocaleString('en-IN')}</div>
        `;
        donorList.appendChild(item);
      });
    }

    // ==================== SUCCESS MODAL ====================
    function closeSuccessModal() {
      document.getElementById('successModal').classList.remove('show');
    }

    document.getElementById('successModal').addEventListener('click', (e) => {
      if (e.target.id === 'successModal') {
        closeSuccessModal();
      }
    });

    // ==================== NOTIFICATIONS ====================
    function showNotification(type, title, message) {
      notification.className = 'notification ' + type;
      notification.querySelector('.notification-title').textContent = title;
      notification.querySelector('.notification-message').textContent = message;
      
      const icon = notification.querySelector('.notification-icon i');
      icon.className = 'fas ' + (type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle');
      
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 4000);
    }

    notificationClose.addEventListener('click', () => {
      notification.classList.remove('show');
    });

    // ==================== SCROLL REVEAL ====================
    function initScrollReveal() {
      const revealElements = document.querySelectorAll('.reveal');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    }

    // ==================== ANIMATE STATS ====================
    function animateStats() {
      const stats = document.querySelectorAll('.stat-number');
      
      stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
          current += step;
          if (current < target) {
            stat.textContent = Math.floor(current).toLocaleString('en-IN');
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent = target.toLocaleString('en-IN');
          }
        };
        
        setTimeout(updateCount, 500);
      });
    }

    // ==================== ANIMATE PROGRESS BAR ====================
    function animateProgressBar() {
      const progressFill = document.querySelector('.progress-fill');
      const targetWidth = progressFill.dataset.width;
      
      setTimeout(() => {
        progressFill.style.width = targetWidth + '%';
      }, 500);
    }

    // ==================== SCROLL TO TOP ====================
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSuccessModal();
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
      }
    });