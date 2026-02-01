// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // TYPING EFFECT - HERO
  // =====================
  const typingElement = document.getElementById("typing");
  const textToType = "Getamesay Hailemeskel Ayele";
  let index = 0;
  let isDeleting = false;

  function type() {
    if (!typingElement) return;

    if (!isDeleting && index <= textToType.length) {
      typingElement.textContent = textToType.slice(0, index) + "|";
      index++;
      setTimeout(type, 150);
    } else if (isDeleting && index >= 0) {
      typingElement.textContent = textToType.slice(0, index) + "|";
      index--;
      setTimeout(type, 100);
    } else if (index === textToType.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (index === 0) {
      isDeleting = false;
      setTimeout(type, 500);
    }
  }
  type();

  // =====================
  // SCROLL ANIMATIONS
  // =====================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // =====================
  // SKILL BARS ANIMATION
  // =====================
  function animateSkills() {
    const skillFills = document.querySelectorAll(".progress-fill");
    skillFills.forEach((fill) => {
      const value = fill.getAttribute("data-progress");
      fill.style.width = value;
    });
  }

  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkills();
          }
        });
      },
      { threshold: 0.5 }
    );
    skillsObserver.observe(skillsSection);
  }
// =====================
// CONTACT FORM WITH VALIDATION + FORMSPREE
// =====================
/*
contact form js here
*/
const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Prepare data for Formspree
    const formData = new FormData(form);

    fetch("https://formspree.io/f/mnjvyyar", { // your Formspree URL
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Show success message
        formSuccess.classList.add("show");
        form.reset();

        // Hide message after 3 seconds
        setTimeout(() => {
          formSuccess.classList.remove("show");
        }, 3000);
      } else {
        response.json().then(data => {
          alert(data.error || "Oops! Something went wrong.");
        });
      }
    })
    .catch(error => {
      console.error(error);
      alert("Oops! Something went wrong.");
    });
  });
}

});

