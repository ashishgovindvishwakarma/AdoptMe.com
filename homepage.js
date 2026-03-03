// ==================== ELEMENT REFERENCES ==================== //
const hamburger = document.querySelector(".hamburger");
// Corrected selector from "#.nav-menu" to ".nav-menu"
const navMenu = document.querySelector(".nav-menu"); 
const overlay = document.querySelector(".menu-overlay");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
const mapFrame = document.getElementById("rescue-map-iframe");

// Default coordinates (e.g., Mumbai, India)
const DEFAULT_LAT = 19.0760; 
const DEFAULT_LNG = 72.8777;
const DEFAULT_ZOOM = 10;
// Corrected Default Map Source using the standard Embed API URL structure
const DEFAULT_MAP_SRC = `https://maps.google.com/maps?q=${DEFAULT_LAT},${DEFAULT_LNG}&hl=en&z=${DEFAULT_ZOOM}&output=embed`; 

// ==================== MOBILE MENU TOGGLE ==================== //
if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

// Close menu when clicking overlay or any menu link
if (overlay) {
  overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
}


document.querySelectorAll(".nav-menu a").forEach(link =>
  link.addEventListener("click", () => {
    // Only close if menu is open (for mobile)
    if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
    }
  })
);


// ==================== DARK MODE TOGGLE LOGIC ==================== //
function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (initialDark) {
        document.body.classList.add("dark");
        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    } else {
         document.body.classList.remove("dark");
         if (themeIcon) {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        if (isDark) {
            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
            localStorage.setItem("theme", "dark");
        } else {
            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
            localStorage.setItem("theme", "light");
        }
    });
}


// ==================== RESCUE MAP IMPLEMENTATION ==================== //

/**
 * Gets the current location of the user.
 * @returns {Promise<{latitude: number, longitude: number}>} User's coordinates.
 */
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                // User denied permission or position unavailable
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    });
}

/**
 * Constructs the Google Maps Embed URL for a specific location.
 * @param {number} lat Latitude.
 * @param {number} lng Longitude.
 * @param {number} zoom Zoom level.
 * @returns {string} The constructed map URL.
 */
function createMapUrl(lat, lng, zoom = DEFAULT_ZOOM) {
    // Standard Google Maps Embed URL format
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`;
}

/**
 * Tries to get the user's location and updates the map, or uses a default India location.
 */
async function loadRescueMap() {
    if (!mapFrame) return;

    try {
        const coords = await getCurrentLocation();
        // Use user's location if available
        mapFrame.src = createMapUrl(coords.latitude, coords.longitude, DEFAULT_ZOOM);
        console.log("Map centered on user's location.");
    } catch (error) {
        // Fallback to default India view (Mumbai) if geolocation fails or is denied
        mapFrame.src = DEFAULT_MAP_SRC;
        console.warn("Geolocation failed, using default India map view.", error.message);
    }
}


// ==================== BACK TO TOP BUTTON (Made global on window for HTML onclick) ==================== //
window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Initialize theme and load map when the page loads
document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    loadRescueMap();
});

/* ===== LOADER PROGRESS ===== */

let percent = 0;
const percentText = document.getElementById("loader-percent");
const loader = document.getElementById("loader");

const loading = setInterval(() => {
  percent += 2;
  percentText.textContent = percent + "%";

  if (percent >= 100) {
    clearInterval(loading);

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 400);
  }
}, 30);


/* Hide when page fully loads */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500);
});

//authentication profile js
// ==================== AUTH CHECK & HEADER UPDATE ==================== //
function updateUserHeader() {
    const userData = localStorage.getItem('user');
    const userProfileHeader = document.getElementById('userProfileHeader');
    const navMenuUl = document.querySelector('.nav-menu ul'); // Get the ul inside nav

    if (userData) {
        const user = JSON.parse(userData);
        
        // 1. Show User Profile in Header
        if (userProfileHeader) {
            userProfileHeader.style.display = 'flex';
            document.getElementById('navUserImg').src = user.img || 'https://via.placeholder.com/40';
            document.getElementById('navUserName').textContent = user.name.split(' ')[0]; // Show first name
            
            // Clicking the avatar goes to dashboard
            userProfileHeader.onclick = () => window.location.href = 'dashboard.html';
        }

        // 2. Update Nav Links (Remove Login/Register, Add Dashboard/Logout)
        if (navMenuUl) {
            // Remove Login and Register links
            const loginLi = navMenuUl.querySelector('a[href="login.html"]')?.parentElement;
            const registerLi = navMenuUl.querySelector('a[href="register.html"]')?.parentElement;
            if (loginLi) loginLi.style.display = 'none';
            if (registerLi) registerLi.style.display = 'none';

            // Add Logout link if not exists
            if (!navMenuUl.querySelector('.logout-btn')) {
                const li = document.createElement('li');
                li.innerHTML = '<a href="#" class="logout-btn" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Logout</a>';
                navMenuUl.appendChild(li);
            }
        }
    }
}

function logoutUser() {
    localStorage.removeItem('user');
    showNotification('success', 'Logged Out', 'See you again soon!');
    setTimeout(() => window.location.reload(), 1000);
}

// Run on load
document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    loadRescueMap();
    updateUserHeader(); // Call the auth check
});

// Simple notification helper for homepage
function showNotification(type, title, message) {
    const existing = document.querySelector('.notification');
    if(existing) existing.remove();
    
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} notification-icon"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 100);
    setTimeout(() => { notif.classList.remove('show'); notif.remove(); }, 3000);
}

//new section js
// Add these functions to your existing homepage.js

// ==================== COUNTER ANIMATION ==================== //
function animateCounters() {
  const counters = document.querySelectorAll('.stat-box h3');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 200; // Speed of counting

    const updateCount = () => {
      const count = +counter.innerText.replace(/,/g, '');
      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target.toLocaleString() + '+';
      }
    };
    updateCount();
  });
}

// Run counter when stats section is in view
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}

// ==================== FAVORITE BUTTON INTERACTION ================= ===
document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('active');
    const icon = this.querySelector('i');
    
    if(this.classList.contains('active')) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      showNotification('success', 'Added!', 'Added to your favorites.');
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
    }
  });
});

// ==================== NEWSLETTER FORM HANDLER ================= ===
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  // Simulate submission
  showNotification('success', 'Subscribed!', `Thank you for subscribing with ${email}`);
  e.target.reset();
}

// Ensure DOM is loaded before attaching listeners
document.addEventListener("DOMContentLoaded", () => {
    // ... (Your existing DOMContentLoaded code)
    initializeTheme();
    loadRescueMap();
    updateUserHeader();
});
