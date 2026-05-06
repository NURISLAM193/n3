document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("#mobile-menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("hidden", isExpanded);
    });
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = "https://nurislam193.github.io/n3/";
    });
  });

  document.querySelectorAll(".product-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const mainImage = document.querySelector("#product-main-image");
      const image = thumb.getAttribute("data-product-image");
      if (!mainImage || !image) return;
      document.querySelectorAll(".product-thumb").forEach((item) => item.classList.remove("is-active"));
      thumb.classList.add("is-active");
      mainImage.src = image;
    });
  });

  document.querySelectorAll(".size-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".size-chip").forEach((item) => item.classList.remove("size-chip-active"));
      chip.classList.add("size-chip-active");
    });
  });

  setupFaqAccordions();
});

function setupFaqAccordions() {
  document.querySelectorAll('[data-purpose="faq-section"] .faq-card').forEach((item) => {
    item.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      const section = item.closest('[data-purpose="faq-section"]');
      section?.querySelectorAll(".faq-card.open").forEach((openItem) => {
        if (openItem !== item) closeFaq(openItem);
      });
      if (isOpen) closeFaq(item);
      else openFaq(item);
    });
  });
}

function openFaq(item) {
  item.classList.add("open");
  const icon = item.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-xmark");
  }
  if (!item.querySelector(".faq-answer")) {
    const paragraph = document.createElement("p");
    paragraph.className = "faq-answer";
    paragraph.textContent = item.getAttribute("data-answer") || "Please contact our support team for more information.";
    item.appendChild(paragraph);
  }
}

function closeFaq(item) {
  item.classList.remove("open");
  item.querySelector(".faq-answer")?.remove();
  const icon = item.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-plus");
  }
}
