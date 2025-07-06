// ===== MAIN SCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
  // Scroll effect for navigation
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = '#000';
      nav.style.padding = '0.5rem 2rem';
    } else {
      nav.style.background = 'rgba(0,0,0,0.85)';
      nav.style.padding = '1rem 2rem';
    }
  });

  // Set active navigation link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (currentPage === linkPage) {
      link.classList.add('active');
    }
  });

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyScript = document.createElement('script');
    lazyScript.src = 'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js';
    document.body.appendChild(lazyScript);
    
    lazyScript.onload = () => {
      const observer = lozad();
      observer.observe();
    };
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Video gallery lightbox (optional)
  document.querySelectorAll('.video-gallery iframe').forEach(iframe => {
    iframe.addEventListener('click', () => {
      iframe.requestFullscreen();
    });
  });
});

// ===== STORE FUNCTIONALITY =====
function initializeStore() {
  const cart = [];
  const addToCartButtons = document.querySelectorAll('.merch-item .btn');
  
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const item = this.closest('.merch-item');
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = item.querySelector('p').textContent;
        
        cart.push({
          name: itemName,
          price: itemPrice
        });
        
        // Update cart UI
        updateCartCounter();
        
        // Visual feedback
        this.textContent = 'Added!';
        setTimeout(() => {
          this.textContent = 'Add to Cart';
        }, 2000);
      });
    });
  }
  
  function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
      cartCounter.textContent = cart.length;
      cartCounter.style.display = cart.length ? 'block' : 'none';
    }
  }
}

// Initialize store if on store page
if (document.querySelector('.merch-grid')) {
  initializeStore();
}

// MOBILE MENU TOGGLE
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  document.querySelector('nav').appendChild(menuToggle);
  
  // Toggle menu
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      document.querySelector('.nav-links').classList.remove('active');
    });
  });
  
  // Android viewport height fix
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVH();
  window.addEventListener('resize', setVH);
  
  // Prevent 300ms click delay
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
});

// LAZY LOADING FOR MOBILE
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

const playButton = document.getElementById('playButton');
const audio = document.getElementById('bgMusic');

// Initialize with lower volume for better UX
audio.volume = 0.3;

let isPlaying = false;

// Better to handle this in a separate function for reusability
function togglePlayback() {
  if (isPlaying) {
    audio.pause();
    playButton.textContent = 'Play Music';
    playButton.classList.remove('playing'); // Optional: for styling
  } else {
    audio.play()
      .then(() => {
        playButton.textContent = 'Pause Music';
        playButton.classList.add('playing'); // Optional: for styling
      })
      .catch(error => {
        console.error("Playback failed:", error);
        // Show user feedback - could be a small notification
        alert("Please interact with the page first to play music");
      });
  }
  isPlaying = !isPlaying;
}

// Single event listener
playButton.addEventListener('click', togglePlayback);

// Optional: Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault(); // Prevent default space behavior (scrolling)
    togglePlayback();
  }
});

document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const socialIcons = document.querySelector('.social-icons');
    
    // Toggle mobile menu when hamburger icon is clicked
    menuToggle.addEventListener('click', function() {
        // Toggle the 'active' class on the nav links
        navLinks.classList.toggle('active');
        
        // Optional: Toggle social icons visibility in mobile menu
        if (window.innerWidth <= 768) {
            socialIcons.classList.toggle('active');
        }
        
        // Change the menu icon between ☰ and ✕
        this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when a nav link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                socialIcons.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });
    
    // Close menu when clicking outside of it (optional)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            socialIcons.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
});
