  // Навигация между страницами
        document.querySelectorAll('.nav-link, .icon-item[data-page], .button[data-page], .footer-column a[data-page]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Закрываем бургер-меню если открыто
                if (window.innerWidth <= 768) {
                    document.querySelector('nav').classList.remove('active');
                    document.querySelector('.burger-menu').classList.remove('active');
                }
                
                // Убираем активный класс у всех ссылок в навигации
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                
                // Добавляем активный класс текущей ссылке (если это навигационная ссылка)
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }
                
                // Скрываем все страницы
                document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
                
                // Показываем выбранную страницу
                const pageId = this.getAttribute('data-page');
                document.getElementById(pageId).classList.add('active');
                
                // Прокрутка вверх
                window.scrollTo(0, 0);
                
                // Запускаем анимации для элементов на новой странице
                setTimeout(initScrollAnimations, 100);
            });
        });
        
        // Кнопка "Начать обучение" на главной
        document.getElementById('startLearningBtn').addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector('[data-page="courses"]').classList.add('active');
            
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById('courses').classList.add('active');
            
            window.scrollTo(0, 0);
            setTimeout(initScrollAnimations, 100);
        });
        
        // Бургер-меню
        document.querySelector('.burger-menu').addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('nav').classList.toggle('active');
        });
        
        // Фильтры курсов
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Анимации при нажатии
        document.querySelectorAll('.icon-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Анимации при скролле
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
            );
        }
        
        function handleScrollAnimation() {
            const elements = document.querySelectorAll('.section, .banner, .icon-item, .card, .color-item, .filter-btn, .profile-header, .stat-card');
            
            elements.forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('visible');
                }
            });
            
            // Кнопка "Наверх"
            const scrollButton = document.querySelector('.scroll-to-top');
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        }
        
        function initScrollAnimations() {
            // Сначала сбрасываем все анимации
            const elements = document.querySelectorAll('.section, .banner, .icon-item, .card, .color-item, .filter-btn, .profile-header, .stat-card');
            elements.forEach(el => {
                el.classList.remove('visible');
            });
            
            // Затем запускаем проверку
            setTimeout(() => {
                handleScrollAnimation();
            }, 100);
        }
        
        // Прокрутка к верху страницы
        document.querySelector('.scroll-to-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Инициализация при загрузке страницы
        window.addEventListener('load', function() {
            initScrollAnimations();
        });
        
        // Обработка скролла
        window.addEventListener('scroll', handleScrollAnimation);
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(e) {
            const nav = document.querySelector('nav');
            const burger = document.querySelector('.burger-menu');
            
            if (window.innerWidth <= 768 && 
                nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !burger.contains(e.target)) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
        });