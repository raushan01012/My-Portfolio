const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const sections = document.querySelectorAll("header[id], section[id]");
const revealItems = document.querySelectorAll(".reveal");
const circles = document.querySelectorAll(".circle");
const typingText = document.getElementById("typingText");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });

    menuToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navMenu.classList.toggle("show");
        }
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("show");
        }
    });
});

document.addEventListener("click", (e) => {
    if (!navMenu || !menuToggle) return;

    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedMenuButton = menuToggle.contains(e.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        navMenu.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu) {
        navMenu.classList.remove("show");
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

let ticking = false;

function handleScrollEffects() {
    const scrollY = window.scrollY;

    if (navbar) {
        if (scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    if (scrollTopBtn) {
        if (scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    }

    ticking = false;
}

window.addEventListener(
    "scroll",
    () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScrollEffects);
            ticking = true;
        }
    },
    { passive: true }
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.45
    }
);

sections.forEach((section) => sectionObserver.observe(section));

function animateCircle(circle) {
    const percent = Number(circle.getAttribute("data-percent")) || 0;
    const small = circle.querySelector("small");
    let current = 0;

    function updateProgress() {
        current += 1;

        if (current > percent) return;

        const degree = (current / 100) * 360;
        circle.style.background = `conic-gradient(#38d39f ${degree}deg, rgba(255,255,255,0.08) ${degree}deg)`;

        if (small) {
            small.textContent = `${current}%`;
        }

        requestAnimationFrame(updateProgress);
    }

    updateProgress();
}

const skillObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCircle(entry.target);
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.35
    }
);

circles.forEach((circle) => skillObserver.observe(circle));

if (typingText) {
    const words = ["Frontend Developer", "Creative Coder", "UI Designer", "Video Editor"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        typingText.textContent = currentWord.substring(0, charIndex);

        if (!isDeleting) {
            charIndex++;
            if (charIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1000);
                return;
            }
        } else {
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                charIndex = 0;
            }
        }

        setTimeout(typeEffect, isDeleting ? 45 : 85);
    }

    typeEffect();
}

handleScrollEffects();