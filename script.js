
/* =====================================
   PORTFOLIO NAVIGATION MENU
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}


/* =====================================
   CONTACT FORM WITH EMAILJS
===================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const formStatus = document.getElementById("form-status");
    const sendButton = document.getElementById("send-button");

    const PUBLIC_KEY = "PThzV-BBARfsTXzUe";
    const SERVICE_ID = "service_933u5ym";
    const TEMPLATE_ID = "template_y8xt48a";

    if (typeof emailjs === "undefined") {
        formStatus.textContent =
            "Email service did not load. Check your internet connection.";
    } else {
        emailjs.init({
            publicKey: PUBLIC_KEY
        });

        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            sendButton.disabled = true;
            sendButton.textContent = "Sending...";
            formStatus.textContent = "Sending your message...";

            try {
                await emailjs.sendForm(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    contactForm
                );

                formStatus.textContent =
                    "Message sent successfully! Thank you for contacting me.";

                contactForm.reset();

            } catch (error) {
                console.error("EmailJS error:", error);

                formStatus.textContent =
                    "Message not sent: " +
                    (error.text || error.message || "Please try again.");

            } finally {
                sendButton.disabled = false;
                sendButton.textContent = "Send Message ↗";
            }
        });
    }
}
