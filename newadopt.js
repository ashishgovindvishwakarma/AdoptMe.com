 // ==================== DATA ====================
    const dogsData = [
      {
        id: 1,
        name: "Buddy",
        breed: "labrador",
        age: "young",
        gender: "male",
        size: "large",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
        description: "A friendly and energetic Labrador who loves playing fetch and swimming. Great with kids and other pets.",
        location: "Mumbai",
        badge: "Featured"
      },
      {
        id: 2,
        name: "Luna",
        breed: "german-shepherd",
        age: "adult",
        gender: "female",
        size: "large",
        image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop",
        description: "A loyal and intelligent German Shepherd. Well-trained and excellent for families looking for a protective companion.",
        location: "Delhi",
        badge: "Trained"
      },
      {
        id: 3,
        name: "Max",
        breed: "beagle",
        age: "puppy",
        gender: "male",
        size: "medium",
        image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop",
        description: "An adorable Beagle puppy with endless curiosity. Loves exploring and has the cutest howl!",
        location: "Bangalore",
        badge: "Puppy"
      },
      {
        id: 4,
        name: "Bella",
        breed: "golden-retriever",
        age: "young",
        gender: "female",
        size: "large",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
        description: "A gentle Golden Retriever with a heart of gold. Perfect therapy dog material with her calm demeanor.",
        location: "Chennai",
        badge: "Popular"
      },
      {
        id: 5,
        name: "Rocky",
        breed: "pariah",
        age: "adult",
        gender: "male",
        size: "medium",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
        description: "A resilient Indian Pariah dog who survived the streets. Healthy, vaccinated, and incredibly grateful.",
        location: "Hyderabad",
        badge: "Rescued"
      },
      {
        id: 6,
        name: "Daisy",
        breed: "mixed",
        age: "senior",
        gender: "female",
        size: "small",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop",
        description: "A sweet senior mixed breed looking for a peaceful retirement home. Low energy, high affection.",
        location: "Pune",
        badge: "Senior"
      },
      {
        id: 7,
        name: "Charlie",
        breed: "labrador",
        age: "puppy",
        gender: "male",
        size: "medium",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
        description: "An energetic Labrador puppy ready to bring joy to your home. Loves water and squeaky toys!",
        location: "Kolkata",
        badge: "New"
      },
      {
        id: 8,
        name: "Zara",
        breed: "mixed",
        age: "young",
        gender: "female",
        size: "medium",
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
        description: "A beautiful mixed breed with unique markings. Playful, smart, and great on a leash.",
        location: "Ahmedabad",
        badge: null
      }
    ];

    const recentAdoptions = [
      { adopter: "Priya S.", dog: "Simba", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop", date: "2 days ago" },
      { adopter: "Rahul M.", dog: "Tuffy", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop", date: "5 days ago" },
      { adopter: "Anita K.", dog: "Brownie", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop", date: "1 week ago" },
      { adopter: "Vikram T.", dog: "Shadow", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop", date: "2 weeks ago" }
    ];

    // ==================== DOM ELEMENTS ====================
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dogList = document.getElementById('dog-list');
    const recentAdoptionsContainer = document.getElementById('recent-adoptions');
    const adoptionForm = document.getElementById('adoptionForm');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const notification = document.getElementById('notification');
    const notificationClose = document.getElementById('notificationClose');

    // Filter selects
    const breedFilter = document.getElementById('breedFilter');
    const ageFilter = document.getElementById('ageFilter');
    const genderFilter = document.getElementById('genderFilter');
    const sizeFilter = document.getElementById('sizeFilter');

    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', () => {
      renderDogs(dogsData);
      renderRecentAdoptions();
      initScrollReveal();
      setMinDate();
    });

    // Set minimum date for adoption date input
    function setMinDate() {
      const dateInput = document.getElementById('date');
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

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

    // ==================== RENDER DOGS ====================
    function renderDogs(dogs) {
      dogList.innerHTML = '';
      
      if (dogs.length === 0) {
        dogList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-light);">No dogs found matching your criteria. Try adjusting your filters.</p>';
        return;
      }

      dogs.forEach((dog, index) => {
        const card = document.createElement('div');
        card.className = 'dog-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
          <div class="dog-card-image">
            <img src="${dog.image}" alt="${dog.name}" loading="lazy">
            ${dog.badge ? `<span class="dog-badge">${dog.badge}</span>` : ''}
            <button class="dog-favorite" onclick="toggleFavorite(this, ${dog.id})" aria-label="Add to favorites">
              <i class="far fa-heart"></i>
            </button>
          </div>
          <div class="dog-card-content">
            <h3>${dog.name}</h3>
            <div class="dog-details">
              <span class="dog-detail"><i class="fas fa-paw"></i> ${dog.breed.replace('-', ' ')}</span>
              <span class="dog-detail"><i class="fas fa-birthday-cake"></i> ${dog.age}</span>
              <span class="dog-detail"><i class="fas fa-${dog.gender === 'male' ? 'mars' : 'venus'}"></i> ${dog.gender}</span>
            </div>
            <p>${dog.description}</p>
            <div class="dog-actions">
              <button class="btn btn-primary" onclick="startAdoption(${dog.id}, '${dog.name}')">
                <i class="fas fa-heart"></i> Adopt Me
              </button>
              <button class="btn btn-secondary" onclick="viewDetails(${dog.id})">
                <i class="fas fa-eye"></i> Details
              </button>
            </div>
          </div>
        `;
        dogList.appendChild(card);
      });
    }

    // ==================== RENDER RECENT ADOPTIONS ====================
    function renderRecentAdoptions() {
      recentAdoptionsContainer.innerHTML = '';
      recentAdoptions.forEach(adoption => {
        const card = document.createElement('div');
        card.className = 'adoption-card';
        card.innerHTML = `
          <img src="${adoption.image}" alt="${adoption.dog}" loading="lazy">
          <h4>${adoption.dog}</h4>
          <p>Adopted by ${adoption.adopter}</p>
          <p style="font-size: 0.8rem; opacity: 0.8;">${adoption.date}</p>
        `;
        recentAdoptionsContainer.appendChild(card);
      });
    }

    // ==================== FILTERS ====================
    function applyFilters() {
      let filteredDogs = [...dogsData];

      const breed = breedFilter.value;
      const age = ageFilter.value;
      const gender = genderFilter.value;
      const size = sizeFilter.value;

      if (breed) filteredDogs = filteredDogs.filter(d => d.breed === breed);
      if (age) filteredDogs = filteredDogs.filter(d => d.age === age);
      if (gender) filteredDogs = filteredDogs.filter(d => d.gender === gender);
      if (size) filteredDogs = filteredDogs.filter(d => d.size === size);

      renderDogs(filteredDogs);
      showNotification('success', 'Filters Applied', `Found ${filteredDogs.length} dog(s) matching your criteria`);
    }

    function resetFilters() {
      breedFilter.value = '';
      ageFilter.value = '';
      genderFilter.value = '';
      sizeFilter.value = '';
      searchInput.value = '';
      renderDogs(dogsData);
      showNotification('success', 'Filters Reset', 'Showing all available dogs');
    }

    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);

    // ==================== SEARCH ====================
    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();
      if (!query) {
        renderDogs(dogsData);
        return;
      }

      const filtered = dogsData.filter(dog => 
        dog.name.toLowerCase().includes(query) ||
        dog.breed.toLowerCase().includes(query) ||
        dog.location.toLowerCase().includes(query) ||
        dog.description.toLowerCase().includes(query)
      );

      renderDogs(filtered);
      showNotification('success', 'Search Results', `Found ${filtered.length} dog(s) for "${query}"`);
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });

    // ==================== FAVORITES ====================
    function toggleFavorite(btn, dogId) {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('success', 'Added to Favorites', 'This dog has been added to your favorites');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('success', 'Removed from Favorites', 'This dog has been removed from your favorites');
      }
    }

    // ==================== ADOPTION FORM ====================
    function startAdoption(dogId, dogName) {
      document.getElementById('dogName').value = dogName;
      document.getElementById('dogId').value = dogId;
      document.getElementById('adoptorName').focus();
      document.getElementById('adoptionForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
      showNotification('success', 'Great Choice!', `You're applying to adopt ${dogName}. Please fill out the form below.`);
    }

    function viewDetails(dogId) {
      const dog = dogsData.find(d => d.id === dogId);
      if (dog) {
        showNotification('success', dog.name, `${dog.description} Located in ${dog.location}.`);
      }
    }

    function resetForm() {
      adoptionForm.reset();
      document.getElementById('dogName').value = '';
      document.getElementById('dogId').value = '';
      showNotification('success', 'Form Reset', 'The form has been cleared');
    }

    // Form submission
    adoptionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const adoptorName = document.getElementById('adoptorName').value;
      const dogName = document.getElementById('dogName').value;
      const adoptorAge = document.getElementById('adoptorAge').value;
      const adoptorEmail = document.getElementById('adoptorEmail').value;
      
      // Validation
      if (parseInt(adoptorAge) < 18) {
        showNotification('error', 'Age Requirement', 'You must be at least 18 years old to adopt');
        return;
      }

      if (!dogName) {
        showNotification('error', 'Select a Dog', 'Please select a dog to adopt first');
        return;
      }

      // Show certificate
      document.getElementById('certName').textContent = adoptorName;
      document.getElementById('certDog').textContent = dogName;
      document.getElementById('certDate').textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      document.getElementById('certificatePopup').classList.add('show');
      
      // Reset form
      adoptionForm.reset();
      document.getElementById('dogName').value = '';
      document.getElementById('dogId').value = '';
    });

    // ==================== CERTIFICATE ====================
    function printCertificate() {
      window.print();
    }

    function closeCertificate() {
      document.getElementById('certificatePopup').classList.remove('show');
      showNotification('success', 'Application Submitted', 'We will contact you within 2-3 business days!');
    }

    // ==================== PROCESS MODAL ====================
    function showAdoptionProcessModal() {
      document.getElementById('processModal').classList.add('show');
    }

    function closeProcessModal() {
      document.getElementById('processModal').classList.remove('show');
    }

    // Close on overlay click
    document.getElementById('processModal').addEventListener('click', (e) => {
      if (e.target.id === 'processModal') {
        closeProcessModal();
      }
    });

    // ==================== AUTH MODAL ====================
    const authModal = document.getElementById('authModal');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const modalClose = document.getElementById('modalClose');

    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
    });

    signupTab.addEventListener('click', () => {
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
    });

    modalClose.addEventListener('click', () => {
      authModal.classList.remove('active');
    });

    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.classList.remove('active');
      }
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('success', 'Welcome Back!', 'You have successfully logged in');
      authModal.classList.remove('active');
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (password !== confirmPassword) {
        showNotification('error', 'Password Mismatch', 'Passwords do not match. Please try again.');
        return;
      }
      
      showNotification('success', 'Account Created', 'Welcome! Your account has been created successfully');
      authModal.classList.remove('active');
    });

    // ==================== NOTIFICATIONS ====================
    function showNotification(type, title, message) {
      notification.className = 'notification ' + type;
      notification.querySelector('.notification-title').textContent = title;
      notification.querySelector('.notification-message').textContent = message;
      
      const icon = notification.querySelector('.notification-icon i');
      icon.className = 'fas ' + (type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle');
      
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
        closeCertificate();
        closeProcessModal();
        authModal.classList.remove('active');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
      }
    });