// ── Custom cursor (desktop only) ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

if (cursor && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx - 6 + 'px';
        cursor.style.top = my - 6 + 'px';
    });

    function animateRing() {
        rx += (mx - rx - 18) * 0.12;
        ry += (my - ry - 18) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
    }

    animateRing();

    document.querySelectorAll('a, button, .service-card, .testimonial-card, .gallery-item, .diamond-cell').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            ring.style.transform = 'scale(1.5)';
            ring.style.borderColor = '#E8C96A';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            ring.style.transform = 'scale(1)';
            ring.style.borderColor = '#C9A84C';
        });
    });
}

// ── Hamburger / Mobile Menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function closeMobileMenu() {
    menuOpen = false;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    hamburger.classList.toggle('open', menuOpen);
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
});

mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobileMenu();
});

// ── Navbar scroll ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Reveal animation ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Counter animation ──
function animateCounters() {
    document.querySelectorAll('.stat .n').forEach(el => {
        const raw = el.textContent;
        const target = parseInt(raw);
        if (isNaN(target)) return;

        const suffix = raw.replace(/[0-9]/g, '');
        let current = 0;
        const step = target / 60;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
        }, 25);
    });
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.4 });

const statsEl = document.querySelector('.stats-row');
if (statsEl) statsObserver.observe(statsEl);

// ── Form submit ──
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');

    btn.innerHTML = "<span>✓ Enquiry Sent — We'll Contact You Soon!</span>";
    btn.style.background = 'linear-gradient(135deg, #2a6e2f, #3a8e40)';

    setTimeout(() => {
        btn.innerHTML = "<span>Send Enquiry ✦</span>";
        btn.style.background = '';
    }, 4000);
}

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Gallery touch ──
if (window.matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('touchstart', () => {
            const overlay = item.querySelector('.gallery-overlay');
            if (overlay) overlay.style.opacity = '1';
        }, { passive: true });

        item.addEventListener('touchend', () => {
            setTimeout(() => {
                const overlay = item.querySelector('.gallery-overlay');
                if (overlay) overlay.style.opacity = '';
            }, 1200);
        }, { passive: true });
    });
}



    // WhatsApp message format
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector('[name="name"]').value;
        const phone = document.querySelector('[name="phone"]').value;
        const email = document.querySelector('[name="email"]').value;
        const event = document.querySelector('[name="event"]').value;
        const date = document.querySelector('[name="date"]').value;
        const guests = document.querySelector('[name="guests"]').value;
        const message = document.querySelector('[name="message"]').value;

        const whatsappMessage = ` Lalwani Brothers Enquiry 

Name: ${name}
Phone: ${phone}
Email: ${email}
Event: ${event}
Date: ${date}
Guests: ${guests}

Message:
${message}`;

        const phoneNumber = "918233699523";

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(url, "_blank");
    });