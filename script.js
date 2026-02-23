// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("sg-nav-toggle--active");
    mainNav.classList.toggle("sg-nav--open");
  });

  // Close nav on link click (mobile)
  mainNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A" && mainNav.classList.contains("sg-nav--open")) {
      mainNav.classList.remove("sg-nav--open");
      navToggle.classList.remove("sg-nav-toggle--active");
    }
  });
}

// Smooth scroll for "View recent installations" button
document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-scroll-target");
    if (!targetId) return;
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Contact form: EmailJS (form data to you + auto-reply to visitor)
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");
const formSubmitBtn = document.getElementById("formSubmitBtn");

if (contactForm && typeof emailjs !== "undefined") {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const serviceId = contactForm.getAttribute("data-emailjs-service") || "";
    const templateId = contactForm.getAttribute("data-emailjs-template") || "";
    const templateReplyId = contactForm.getAttribute("data-emailjs-template-reply") || "";
    const publicKey = contactForm.getAttribute("data-emailjs-public-key") || "";
    if (!serviceId || !templateId || !publicKey || serviceId.includes("YOUR_")) {
      if (formError) {
        formError.innerHTML = "Form is not configured. Add your EmailJS Service ID, Template IDs and Public Key in contact.html (see form data attributes).";
        formError.hidden = false;
        if (formSuccess) formSuccess.hidden = true;
      }
      return;
    }
    if (formSuccess) formSuccess.hidden = true;
    if (formError) formError.hidden = true;
    const name = (contactForm.querySelector('input[name="name"]') || {}).value || "";
    const email = (contactForm.querySelector('input[name="email"]') || {}).value || "";
    const phone = (contactForm.querySelector('input[name="phone"]') || {}).value || "";
    const projectType = (contactForm.querySelector('select[name="project_type"]') || {}).value || "";
    const location = (contactForm.querySelector('input[name="location"]') || {}).value || "";
    const capacity = (contactForm.querySelector('input[name="capacity"]') || {}).value || "";
    const details = (contactForm.querySelector('textarea[name="details"]') || {}).value || "";
    const btnText = formSubmitBtn ? formSubmitBtn.textContent : "";
    if (formSubmitBtn) {
      formSubmitBtn.disabled = true;
      formSubmitBtn.textContent = "Sending…";
    }
    try {
      emailjs.init(publicKey);
      var paramsToOwner = {
        from_name: name,
        from_email: email,
        phone: phone,
        project_type: projectType,
        location: location,
        capacity: capacity,
        message: details,
      };
      await emailjs.send(serviceId, templateId, paramsToOwner);
      if (templateReplyId && templateReplyId.indexOf("YOUR_") === -1) {
        var paramsReply = {
          to_email: email,
          to_name: name,
        };
        await emailjs.send(serviceId, templateReplyId, paramsReply);
      }
      if (formSuccess) formSuccess.hidden = false;
      contactForm.reset();
    } catch (err) {
      if (formError) formError.hidden = false;
    } finally {
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = btnText;
      }
    }
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// Client reviews slider
(function () {
  const track = document.querySelector(".sg-reviews-track");
  const dotsContainer = document.querySelector(".sg-reviews-dots");
  const prevBtn = document.querySelector(".sg-reviews-prev");
  const nextBtn = document.querySelector(".sg-reviews-next");
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll(".sg-review-slide");
  const total = slides.length;
  if (total === 0) return;

  let current = 0;

  function goTo(index) {
    current = ((index % total) + total) % total;
    slides.forEach((s, i) => s.classList.toggle("sg-review-slide--active", i === current));
    dotsContainer.querySelectorAll(".sg-reviews-dot").forEach((d, i) => {
      d.classList.toggle("sg-reviews-dot--active", i === current);
      d.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "sg-reviews-dot" + (i === 0 ? " sg-reviews-dot--active" : "");
    dot.setAttribute("aria-label", "Go to review " + (i + 1));
    dot.setAttribute("aria-current", i === 0 ? "true" : "false");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

  let autoplay = setInterval(() => goTo(current + 1), 3000);
  track.closest(".sg-reviews-slider")?.addEventListener("mouseenter", () => clearInterval(autoplay));
  track.closest(".sg-reviews-slider")?.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => goTo(current + 1), 3000);
  });
})();

