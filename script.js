document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('hero');
    const sidebar = document.getElementById('sidebar');
    const mainPhoto = document.getElementById('main-photo');
    const menuPhoto = document.getElementById('menu-photo');
    
    // Анимация фото и появление меню
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollPosition > heroHeight * 0.3) {
            sidebar.classList.add('active');
            menuPhoto.classList.add('active');
        } else {
            sidebar.classList.remove('active');
            menuPhoto.classList.remove('active');
        }
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Хэштеги для разных разделов
    const sectionHashtags = {
        about: ["#ProjectManagement", "#ITProjects", "#Agile", "#Scrum", "#TeamLeadership", "#BusinessAnalysis"],
        experience: ["#WorkExperience", "#CareerGrowth", "#ProfessionalDevelopment", "#ITCareer", "#ProjectManager"],
        education: ["#HigherEducation", "#KFU", "#LifelongLearning", "#Certifications", "#StudentLife"],
        skills: ["#HardSkills", "#SoftSkills", "#Leadership", "#Communication", "#ProblemSolving"],
        projects: ["#MyProjects", "#Portfolio", "#CaseStudies", "#GitHub", "#ITProjects"],
        contacts: ["#HireMe", "#JobOpportunities", "#Networking", "#Freelance", "#ContactMe"]
    };

    // Создаем хэштег-ленты для каждого раздела
    Object.keys(sectionHashtags).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const hashtagBand = document.createElement('div');
            hashtagBand.className = 'hashtag-band';
            
            const hashtagTrack = document.createElement('div');
            hashtagTrack.className = 'hashtag-track';
            
            // Добавляем хэштеги (дважды для бесшовной анимации)
            const tags = sectionHashtags[sectionId];
            tags.concat(tags).forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                hashtagTrack.appendChild(span);
            });
            
            hashtagBand.appendChild(hashtagTrack);
            section.parentNode.insertBefore(hashtagBand, section);
        }
    });

    // Анимация хэштег-лент
    function animateHashtags() {
        document.querySelectorAll('.hashtag-track').forEach(track => {
            const currentPosition = parseFloat(track.dataset.position || 0);
            const newPosition = currentPosition + 0.5; // Постоянная скорость
            
            // Сброс позиции для бесконечной анимации
            track.dataset.position = newPosition > track.scrollWidth / 2 ? 0 : newPosition;
            track.style.transform = `translateX(-${track.dataset.position}px)`;
        });
        
        requestAnimationFrame(animateHashtags);
    }

    // Запускаем анимацию
    animateHashtags();
});

// Модальное окно для сертификатов
function openModal(src) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    document.getElementById('certificateModal').style.display = "none";
}

// Закрытие по клику вне изображения
window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}