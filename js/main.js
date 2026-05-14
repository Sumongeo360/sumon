// Simple enhancement script

document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio loaded successfully");

    // Smooth scroll effect (optional upgrade ready)
    const sections = document.querySelectorAll(".section");

    window.addEventListener("scroll", () => {
        sections.forEach(sec => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 400;

            if (top > offset) {
                sec.style.opacity = "1";
                sec.style.transform = "translateY(0)";
            }
        });
    });
});
