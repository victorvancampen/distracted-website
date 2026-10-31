
/* =========================================
   DISTRACTED
   Photo gallery
   ========================================= */

const gallery = document.querySelector("#gallery");
const slides = document.querySelectorAll(".gallery-slide");
const counter = document.querySelector("#gallery-counter");

// Handle images and missing files

slides.forEach((slide) => {
  const image = slide.querySelector(".gallery-image");

  function showImage() {
    if (image.naturalWidth > 0) {
      slide.classList.add("has-image");
    }
  }

  image.addEventListener("load", showImage);

  // Handle images that have already loaded
  if (image.complete) {
    showImage();
  }

  // Missing images keep their placeholders visible
  image.addEventListener("error", () => {
    slide.classList.remove("has-image");
  });
});


// Update gallery counter

function updateCounter() {
  if (!gallery || !counter || slides.length === 0) {
    return;
  }

  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(gallery).gap) || 0;

  const currentSlide = Math.min(
    slides.length,
    Math.max(
      1,
      Math.round(gallery.scrollLeft / (slideWidth + gap)) + 1
    )
  );

  counter.textContent =
    String(currentSlide).padStart(2, "0") +
    " / " +
    String(slides.length).padStart(2, "0");
}


if (gallery) {
  gallery.addEventListener("scroll", updateCounter, {
    passive: true
  });

  window.addEventListener("resize", updateCounter);

  updateCounter();
}
