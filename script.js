// ======================
// Scroll Reveal Animation
// ======================

function revealElements() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// ======================
// Custom Cursor
// ======================

const cursor = document.querySelector(".cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

// ======================
// Pizza 3D Mouse Effect
// ======================

const pizza = document.querySelector(".pizza");

document.addEventListener("mousemove", (e) => {
    if (!pizza) return;

    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;

    pizza.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

// ======================
// Navbar Scroll Effect
// ======================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0,0,0,0.7)";
        navbar.style.backdropFilter = "blur(18px)";
    } else {
        navbar.style.background = "rgba(255,255,255,0.08)";
    }
});

// ======================
// Mobile Menu Toggle
// ======================

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// ======================
// Smooth Scroll
// ======================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        e.preventDefault();

        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

        if (navLinks) {
            navLinks.classList.remove("show");
        }
    });
});

// ======================
// Counter Animation
// ======================

const stats = document.querySelectorAll(".stat-box h2");

let started = false;

window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".stats");

    if (!statsSection || started) return;

    const top = statsSection.getBoundingClientRect().top;

    if (top < window.innerHeight) {
        started = true;

        stats.forEach((counter) => {
            const originalText = counter.innerText;
            const value = parseInt(originalText);

            if (isNaN(value)) return;

            let count = 0;
            const speed = Math.ceil(value / 100);

            const update = () => {
                count += speed;

                if (count < value) {
                    counter.innerText = count + "+";
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = originalText;
                }
            };

            update();
        });
    }
});

// ======================
// Contact Form
// ======================

const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        alert("🍕 Thank you! Your message has been sent successfully.");

        form.reset();
    });
}

// ======================
// Card Tilt Effect
// ======================

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * 10;
        const rotateY = ((x / rect.width) - 0.5) * -10;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
});

// ======================
// Add To Cart Demo
// ======================

const addButtons = document.querySelectorAll(".price-row button");

addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.innerText = "Added ✓";
        btn.style.background = "#28a745";

        setTimeout(() => {
            btn.innerText = "Add";
            btn.style.background = "#ff7b00";
        }, 2000);
    });
});

// ======================
// Page Fade In
// ======================

window.addEventListener("load", () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = "1";
    }, 100);
});

// ======================
// Order Popup
// ======================

const orderBtn = document.querySelector(".order-btn");
const popup = document.getElementById("orderPopup");
const closeBtn = document.querySelector(".close-btn");

const pizzaType = document.getElementById("pizzaType");
const qty = document.getElementById("qty");
const total = document.getElementById("total");

if (orderBtn && popup) {
    orderBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.style.display = "flex";
    });
}

if (closeBtn && popup) {
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

function updateTotal() {
    if (!pizzaType || !qty || !total) return;

    total.innerText =
        Number(pizzaType.value) * Number(qty.value);
}

if (pizzaType) {
    pizzaType.addEventListener("change", updateTotal);
}

if (qty) {
    qty.addEventListener("input", updateTotal);
}

updateTotal();

const placeOrder = document.getElementById("placeOrder");

if (placeOrder) {
    placeOrder.addEventListener("click", () => {
        const name = document.getElementById("customerName").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const address = document.getElementById("address").value.trim();
        const payment = document.getElementById("payment").value;

        if (!name || !mobile || !address) {
            alert("Please fill all details.");
            return;
        }

        alert(`🍕 Order Confirmed!

Name: ${name}

Mobile: ${mobile}

Address: ${address}

Payment: ${payment}

Total Amount: ₹${total.innerText}`);

        popup.style.display = "none";

        document.getElementById("customerName").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("address").value = "";
        qty.value = 1;

        updateTotal();
    });
}