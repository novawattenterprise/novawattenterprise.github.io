/* ==========================================================================
   SYMBIOSKIN - INTERACTIVE LOGIC, 3D TILT & CANVAS SCROLL WALKTHROUGH
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL-DRIVEN BACKGROUND CANVAS
    const canvas = document.getElementById('scroll-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const loadingOverlay = document.getElementById('loading-overlay');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercentage = document.getElementById('loader-percentage');

    const totalFrames = 240;
    const images = [];
    let loadedCount = 0;

    // Helper to draw image using "cover" aspect-ratio fit
    function drawImageProp(ctx, img, x = 0, y = 0, w = canvas.width, h = canvas.height, offsetX = 0.5, offsetY = 0.5) {
        const iw = img.width;
        const ih = img.height;
        const r = Math.min(w / iw, h / ih);
        let nw = iw * r;
        let nh = ih * r;
        let cx, cy, cw, ch, ar = 1;

        if (nw < w) ar = w / nw;
        if (Math.abs(nh - h) < 0.0001 && ar === 1) ar = h / nh;
        nw *= ar;
        nh *= ar;

        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    // Render the frame matching current scroll position
    function renderFrame() {
        if (!ctx || !canvas) return; // Controllo di sicurezza

        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;

        // Map to frame index (0 to 239)
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(scrollFraction * totalFrames)
        );

        if (images[frameIndex] && images[frameIndex].complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawImageProp(ctx, images[frameIndex]);
        }
    }

    // Handle canvas resizing
    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFrame();
    }

    // Preload image sequence
    function preloadImages() {
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const filename = `images/office-sequence/${String(i).padStart(5, '0')}.jpg`;
            img.src = filename;
            img.onload = () => {
                loadedCount++;
                const percent = Math.floor((loadedCount / totalFrames) * 100);

                // Aggiorna loader solo se gli elementi esistono nella pagina
                if (loaderBar) loaderBar.style.width = `${percent}%`;
                if (loaderPercentage) loaderPercentage.textContent = `${percent}%`;

                if (loadedCount === totalFrames) {
                    setTimeout(() => {
                        if (loadingOverlay) loadingOverlay.classList.add('fade-out');
                        resizeCanvas();
                    }, 500);
                }
            };
            images.push(img);
        }
    }

    // Start preloading only if canvas exists
    if (canvas) {
        preloadImages();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(renderFrame);
        });
    }

    // 2. SCROLL PROGRESS BAR & HEADER EFFECT
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        // Update Scroll Progress Line
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0 && scrollProgress) {
            const percentage = (window.scrollY / totalScroll) * 100;
            scrollProgress.style.width = `${percentage}%`;
        }

        // Header Scrolled Glass Effect
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 3. MOBILE MENU NAVIGATION
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        const toggleMobileMenu = () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
        };

        menuToggle.addEventListener('click', toggleMobileMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    toggleMobileMenu();
                }
            });
        });
    }

    // 4. DARK / LIGHT THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
            document.body.classList.remove('dark-theme');
            if(themeIcon) themeIcon.className = 'fa-solid fa-sun';
        } else {
            document.body.classList.add('dark-theme');
            if(themeIcon) themeIcon.className = 'fa-solid fa-moon';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            if (themeIcon) {
                themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            }

            themeToggle.style.transform = 'scale(0.8) rotate(45deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        });
    }

    // 5. 3D MOUSE TILT EFFECT (PRODUCT VISUAL)
    const productCard = document.getElementById('product-card');

    if (productCard) {
        productCard.addEventListener('mousemove', (e) => {
            const boundingBox = productCard.getBoundingClientRect();
            const mouseX = (e.clientX - boundingBox.left) / boundingBox.width - 0.5;
            const mouseY = (e.clientY - boundingBox.top) / boundingBox.height - 0.5;

            const rotateY = mouseX * 25;
            const rotateX = -mouseY * 25;

            productCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
        });

        productCard.addEventListener('mouseleave', () => {
            productCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });
    }

    // 6. SCROLL-DRIVEN SVG CIRCUIT DRAWING (OVERLAY ON PRODUCT VISUAL)
    const circuitLines = document.querySelectorAll('.circuit-line');
    // Prende la prima hero section che trova (che sia l'id #hero o solo la classe .hero-section)
    const heroSection = document.getElementById('hero') || document.querySelector('.hero-section');

    if (circuitLines.length > 0 && heroSection) {
        window.addEventListener('scroll', () => {
            const heroHeight = heroSection.offsetHeight;
            const scrollPosition = window.scrollY;

            let drawFraction = scrollPosition / (heroHeight * 0.7);
            if (drawFraction < 0) drawFraction = 0;
            if (drawFraction > 1) drawFraction = 1;

            circuitLines.forEach(line => {
                const maxOffset = 120;
                const currentOffset = maxOffset - (drawFraction * maxOffset);
                line.style.strokeDashoffset = currentOffset;
            });
        });
    }

    // 7. BIOMETRIC HOTSPOTS TELEMETRY REGULATOR
    const hotspots = document.querySelectorAll('.hotspot');
    const telemetryBiometric = document.getElementById('telemetry-biometric');
    const telemetryBuilding = document.getElementById('telemetry-building');
    const telemetryEnergy = document.getElementById('telemetry-energy');

    // Eseguiamo il codice solo se esistono sia gli hotspot che i box di testo della telemetria
    if (hotspots.length > 0 && telemetryBiometric && telemetryBuilding && telemetryEnergy) {
        const defaultBiometric = telemetryBiometric.textContent;
        const defaultBuilding = telemetryBuilding.textContent;
        const defaultEnergy = telemetryEnergy.textContent;

        hotspots.forEach(hotspot => {
            hotspot.addEventListener('mouseenter', () => {
                if (hotspot.classList.contains('hotspot-temp')) {
                    telemetryBiometric.innerHTML = '<span class="text-gradient">Temp. Cutanea: 36.6°C</span> (Stabile)';
                    telemetryBuilding.innerHTML = 'Pannelli Radianti: <span class="text-gradient">Calibrazione a 22.0°C</span>';
                } else if (hotspot.classList.contains('hotspot-sweat')) {
                    telemetryBiometric.innerHTML = 'Sudorazione: <span class="text-gradient">0.12 mg/cm²/m</span> (Normale)';
                    telemetryBuilding.innerHTML = 'Ventilazione Micro: <span class="text-gradient">Flusso attivo localizzato</span>';
                } else if (hotspot.classList.contains('hotspot-chip')) {
                    telemetryBiometric.innerHTML = 'Stato AI: <span class="text-gradient">Ottimizzazione Attiva</span>';
                    telemetryBuilding.innerHTML = 'Comfort Termico: <span class="text-gradient">Sintonia Completa</span>';
                    telemetryEnergy.innerHTML = 'Harvesting: <span class="text-gradient">+1.2mW</span> (Calore Corporeo)';
                }
            });

            hotspot.addEventListener('mouseleave', () => {
                telemetryBiometric.textContent = defaultBiometric;
                telemetryBuilding.textContent = defaultBuilding;
                telemetryEnergy.textContent = defaultEnergy;
            });
        });
    }

    // 8. SCROLL REVEAL (INTERSECTION OBSERVER)
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 9. CONTACT FORM SUBMISSION HANDLING (SIMULATED)
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Invio in corso... <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                const nameInput = document.getElementById('name');
                const name = nameInput ? nameInput.value : '';

                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Grazie ${name}, richiesta inviata con successo!`;

                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;

                setTimeout(() => {
                    formFeedback.innerHTML = '';
                    formFeedback.className = 'form-feedback';
                }, 5000);

            }, 1500);
        });
    }
});