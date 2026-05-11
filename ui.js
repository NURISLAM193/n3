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

  setupReviewCarousel();
  setupFaqAccordions();
});

function setupReviewCarousel() {
  const reviewsSection = [...document.querySelectorAll("section")].find((section) =>
    section.querySelector("h2")?.textContent.trim() === "REVIEWS"
  );
  const frame = reviewsSection?.querySelector(".relative");
  const grid = frame?.querySelector(".grid");
  const buttons = frame ? [...frame.querySelectorAll("button")] : [];
  if (!grid || buttons.length < 2) return;

  const rotate = (direction) => {
    const cards = [...grid.children];
    if (cards.length <= 1) return;
    if (direction === "next") {
      grid.appendChild(cards[0]);
    } else {
      grid.prepend(cards[cards.length - 1]);
    }
  };

  buttons[0].addEventListener("click", () => rotate("prev"));
  buttons[1].addEventListener("click", () => rotate("next"));
}

function setupFaqAccordions() {
  document.querySelectorAll('[data-purpose="faq-section"] .faq-card').forEach((item) => {
    prepareFaqCard(item);

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

function prepareFaqCard(item) {
  const title = item.querySelector("span");
  const icon = item.querySelector("i");
  if (!title || !icon || item.querySelector(".faq-header")) return;

  const header = document.createElement("div");
  header.className = "faq-header flex w-full items-start justify-between gap-4";
  icon.classList.add("shrink-0", "mt-0.5");
  title.classList.add("pr-4");
  header.append(title, icon);
  item.prepend(header);
  item.style.display = "flex";
  item.style.flexDirection = "column";
  item.style.alignItems = "stretch";
}

function openFaq(item) {
  item.classList.add("open");
  item.style.display = "flex";
  item.style.flexDirection = "column";
  item.style.alignItems = "stretch";
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
  item.style.display = "flex";
  item.style.flexDirection = "column";
  item.style.alignItems = "stretch";
  item.querySelector(".faq-answer")?.remove();
  const icon = item.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-plus");
  }
}
