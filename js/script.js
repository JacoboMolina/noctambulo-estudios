/* ===================================
   NOCTÁMBULO ESTUDIOS - SCRIPTS
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    /* ===================================
       MOBILE NAVIGATION
       =================================== */
    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    /* ===================================
       NAVBAR SCROLL EFFECT
       =================================== */
    let lastScroll = 0;
    let ticking = false;

    // Cache layout values to avoid reflows
    let navbarHeight = navbar.offsetHeight;

    function updateNavbarScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolled down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbarScroll);
            ticking = true;
        }
    });

    /* ===================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       =================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ===================================
       ACTIVE NAV LINK ON SCROLL
       =================================== */
    const sections = document.querySelectorAll('section[id]');

    // Cache section positions to avoid reflows during scroll
    let sectionData = [];
    let navTicking = false;

    function cacheSectionPositions() {
        navbarHeight = navbar.offsetHeight;
        sectionData = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop,
            height: section.offsetHeight
        }));
    }

    function setActiveNavLink() {
        const scrollPosition = window.pageYOffset + navbarHeight + 100;

        sectionData.forEach(section => {
            if (scrollPosition >= section.top && scrollPosition < section.top + section.height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        navTicking = false;
    }

    function onScrollNav() {
        if (!navTicking) {
            requestAnimationFrame(setActiveNavLink);
            navTicking = true;
        }
    }

    // Cache positions initially and on resize
    cacheSectionPositions();
    window.addEventListener('resize', cacheSectionPositions);
    window.addEventListener('scroll', onScrollNav);
    setActiveNavLink(); // Set initial state

    /* ===================================
       SCROLL ANIMATIONS
       =================================== */
    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-grid > div');

    // Add animation class
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));


    /* ===================================
       PARALLAX EFFECT FOR HERO
       =================================== */
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        const heroContent = hero.querySelector('.hero-content');
        const heroButtons = hero.querySelector('.hero-buttons');

        // Cache hero height to avoid reflows
        let heroHeight = hero.offsetHeight;
        let parallaxTicking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;

            if (scrolled < heroHeight) {
                // Logo y texto se desvanecen normalmente
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / heroHeight);
                }

                // Botones se desvanecen más rápido (2x velocidad)
                if (heroButtons) {
                    heroButtons.style.opacity = 1 - (scrolled / (heroHeight * 0.4));
                }
            }
            parallaxTicking = false;
        }

        function onScrollParallax() {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        }

        // Recache on resize
        window.addEventListener('resize', function() {
            heroHeight = hero.offsetHeight;
        });

        window.addEventListener('scroll', onScrollParallax);
    }

    /* ===================================
       PRELOADER (Optional - uncomment if needed)
       =================================== */
    // window.addEventListener('load', function() {
    //     const preloader = document.querySelector('.preloader');
    //     if (preloader) {
    //         preloader.classList.add('fade-out');
    //         setTimeout(() => preloader.remove(), 500);
    //     }
    // });

    /* ===================================
       GALLERY - CARGA DINÁMICA
       =================================== */
    const galleryFilters = document.getElementById('gallery-filters');
    const galleryGrid = document.getElementById('gallery-grid');

    // Datos de la galería
    const galleryData = {
        categories: [
            { id: "equipo", name: "Equipo" },
            { id: "instrumentos", name: "Instrumentos" },
            { id: "espacio", name: "Nuestro Espacio" }
        ],
        // Imágenes destacadas (siempre primeras y grandes)
        featured: [
            { file: "equipo/rack.jpg", category: "equipo", title: "Rack de Audio", description: "Consola Allen & Heath CQ20B y sistema inalámbrico" },
            { file: "instrumentos/guitarras.jpg", category: "instrumentos", title: "Nuestra Colección", description: "Fender, Gibson, PRS, entre otros" }
        ],
        // Imagen final (siempre última, ancho completo)
        final: { file: "espacio/horizontal.jpg", category: "espacio", title: "Nuestro Espacio", description: "Donde la música cobra vida" },
        // Imágenes que se mezclan aleatoriamente
        images: [
            { file: "equipo/escritorio.jpg", category: "equipo", title: "Producción", description: "Nuestro rincón de producción musical" },
            { file: "equipo/bocina.jpg", category: "equipo", title: "Sistema PA", description: "Escuchate fuerte y claro" },
            { file: "espacio/gobo_1.jpg", category: "espacio", title: "Comodidad", description: "Sillón y Mini Refri" },
            { file: "instrumentos/gobo.jpg", category: "instrumentos", title: "Sala", description: "Con tratamiento acústico" },
            { file: "instrumentos/amp_1.jpg", category: "instrumentos", title: "Amplificadores", description: "No te quedes corto de volumen" },
            { file: "instrumentos/amp_2.jpg", category: "instrumentos", title: "Amplificadores", description: "Para todos los gustos y estilos" },
            { file: "instrumentos/mic.jpg", category: "instrumentos", title: "Micrófono", description: "Microfonía Shure para todos tus ensayos" },
            { file: "espacio/espejo.jpg", category: "espacio", title: "Los escuchamos", description: "Pensamos en cada detalle" }
        ],
        // Sección especial "Ustedes" - se muestra como galería expandible
        ustedes: {
            title: "Ustedes",
            subtitle: "Fotos de Nuestra comunidad",
            featured: "ustedes/ustedes.jpg",
            images: [
                { file: "ustedes/ustedes.jpg", title: "Nuestra Comunidad" },
                { file: "ustedes/ustedes-1.jpg", title: "En el estudio" },
                { file: "ustedes/ustedes-2.jpg", title: "Haciendo música" },
                { file: "ustedes/ustedes-3.jpg", title: "Sesión de ensayo" },
                { file: "ustedes/ustedes-4.jpg", title: "Grabando" },
                { file: "ustedes/ustedes-5.jpg", title: "La banda" }
            ]
        }
    };

    // Función para mezclar array (Fisher-Yates)
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Crear elemento de galería
    function createGalleryItem(image, isFeatured = false) {
        const item = document.createElement('div');
        item.className = 'gallery-item' + (isFeatured ? ' gallery-featured' : '');
        item.dataset.category = image.category;
        item.innerHTML = `
            <img src="assets/img/gallery/${image.file}" alt="${image.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
            </div>
        `;
        return item;
    }

    // Cargar galería
    function loadGallery() {
        const data = galleryData;

        // Generar filtros
        data.categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = category.id;
            btn.textContent = category.name;
            galleryFilters.appendChild(btn);
        });

        // 1. Agregar imágenes destacadas (primeras, grandes)
        data.featured.forEach(image => {
            galleryGrid.appendChild(createGalleryItem(image, true));
        });

        // 2. Agregar imágenes mezcladas aleatoriamente
        const shuffledImages = shuffleArray(data.images);
        shuffledImages.forEach(image => {
            galleryGrid.appendChild(createGalleryItem(image, false));
        });

        // 3. Agregar imagen final (ancho completo)
        const finalItem = createGalleryItem(data.final, false);
        finalItem.classList.add('gallery-final');
        galleryGrid.appendChild(finalItem);

        // Generar sección especial "Ustedes"
        if (data.ustedes) {
            const ustedesSection = document.createElement('div');
            ustedesSection.className = 'ustedes-section';
            ustedesSection.innerHTML = `
                <div class="ustedes-header" id="ustedes-header">
                    <h2>${data.ustedes.title}</h2>
                    <p>${data.ustedes.subtitle}</p>
                </div>
                <div class="ustedes-featured" id="ustedes-featured">
                    <img src="assets/img/gallery/${data.ustedes.featured}" alt="${data.ustedes.title}" loading="lazy">
                    <div class="ustedes-featured-overlay">
                        <h4 class="ustedes-count">Nuestra Comunidad</h4>
                        <p class="ustedes-cta">Ver las ${data.ustedes.images.length} fotos →</p>
                    </div>
                </div>
                <div class="ustedes-expanded hidden" id="ustedes-expanded">
                    <div class="ustedes-grid" id="ustedes-grid">
                        ${data.ustedes.images.map(img => `
                            <div class="ustedes-item">
                                <img src="assets/img/gallery/${img.file}" alt="${img.title}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                    <a href="#ustedes-header" class="ustedes-close" id="ustedes-close">
                        ← Volver
                    </a>
                </div>
            `;
            galleryGrid.parentNode.appendChild(ustedesSection);

            // Event listeners para expandir/colapsar
            const featuredEl = document.getElementById('ustedes-featured');
            const expandedEl = document.getElementById('ustedes-expanded');
            const closeLink = document.getElementById('ustedes-close');

            featuredEl.addEventListener('click', () => {
                featuredEl.classList.add('hidden');
                expandedEl.classList.remove('hidden');
            });

            closeLink.addEventListener('click', (e) => {
                e.preventDefault();
                featuredEl.classList.remove('hidden');
                expandedEl.classList.add('hidden');
                document.getElementById('ustedes-header').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Inicializar filtros después de cargar
        initGalleryFilters();
    }

    // Inicializar filtros
    function initGalleryFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Cargar galería al iniciar
    if (galleryGrid) {
        loadGallery();
    }

    /* ===================================
       DROPDOWN NAVIGATION
       =================================== */
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');

            dropdowns.forEach(d => {
                d.classList.remove('open');
                const t = d.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                dropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });

        if (menu) {
            menu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });

    document.addEventListener('click', function() {
        dropdowns.forEach(d => {
            d.classList.remove('open');
            const t = d.querySelector('.dropdown-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(d => {
                d.classList.remove('open');
                const t = d.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });

    console.log('🐱 Noctámbulo Estudios - Website loaded successfully');
});
