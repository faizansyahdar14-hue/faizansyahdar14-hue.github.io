// =============================================
//  SCRIPT.JS – Web Profil Desa
//  Dibuat untuk PSAT X PPLG 1 SMK Negeri 1 Bawang
// =============================================

// ===== 1. NAVBAR: Hamburger Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Tutup menu saat link diklik (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});


// ===== 2. NAVBAR: Aktif saat scroll =====
const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Tambah class scrolled setelah 50px
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Tandai link aktif sesuai section yang terlihat
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// ===== 3. ANIMASI COUNT-UP (Statistik Penduduk) =====
function countUp(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500; // ms
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('id-ID');
  }, 16);
}

// Jalankan count-up saat elemen masuk viewport
const statNums = document.querySelectorAll('.stat-num');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      countUp(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => countObserver.observe(el));


// ===== 4. ANIMASI BAR CHART =====
// Reset bar width ke 0 lalu animasikan saat terlihat
const barFills = document.querySelectorAll('.bar-fill');

barFills.forEach(bar => {
  const targetWidth = bar.style.width;
  bar.style.width = '0%';
  bar.setAttribute('data-width', targetWidth);
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const target = entry.target.getAttribute('data-width');
      setTimeout(() => {
        entry.target.style.width = target;
      }, 100);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));


// ===== 5. ANIMASI FADE-IN saat scroll =====
const fadeEls = document.querySelectorAll(
  '.org-card, .umkm-card, .galeri-item, .stat-card, .vm-card, .info-row, .kontak-item'
);

// Tambahkan style awal
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));


// ===== 6. FORM KONTAK: Submit Handler =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil data form
    const nama  = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const jenis = document.getElementById('jenis').value;
    const pesan = document.getElementById('pesan').value.trim();

    // Validasi sederhana
    if (!nama || !email || !jenis || !pesan) {
      alert('Harap lengkapi semua kolom yang wajib diisi (*)');
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Format email tidak valid.');
      return;
    }

    // Simulasi pengiriman (tampilkan pesan sukses)
    // Catatan: untuk pengiriman nyata, gunakan backend / EmailJS / FormSpree
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Reset form setelah 4 detik (opsional)
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'block';
      formSuccess.style.display = 'none';
    }, 4000);
  });
}


// ===== 7. SMOOTH SCROLL untuk anchor link =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // tinggi navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ===== 8. GALERI: Lightbox sederhana =====
const galeriItems = document.querySelectorAll('.galeri-item');

galeriItems.forEach(item => {
  item.addEventListener('click', () => {
    const img   = item.querySelector('img');
    const label = item.querySelector('.galeri-label');

    // Buat overlay
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:9999;
      background:rgba(0,0,0,0.9);
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      cursor:pointer; padding:20px;
    `;

    if (img && img.src && !img.style.display.includes('none')) {
      const image = document.createElement('img');
      image.src = img.src;
      image.style.cssText = 'max-width:90%; max-height:80vh; border-radius:8px;';
      overlay.appendChild(image);
    } else {
      const placeholder = document.createElement('div');
      placeholder.textContent = '📷 Gambar tidak tersedia';
      placeholder.style.cssText = 'color:white; font-size:1.2rem;';
      overlay.appendChild(placeholder);
    }

    if (label) {
      const caption = document.createElement('p');
      caption.textContent = label.textContent;
      caption.style.cssText = 'color:white; margin-top:16px; font-size:0.9rem;';
      overlay.appendChild(caption);
    }

    const close = document.createElement('p');
    close.textContent = '✕ Klik untuk menutup';
    close.style.cssText = 'color:rgba(255,255,255,0.5); margin-top:12px; font-size:0.8rem;';
    overlay.appendChild(close);

    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});