
// =========================================
// DISTRACTED — GALLERY
// =========================================

const gallery = document.querySelector("#gallery");
const slides = document.querySelectorAll(".gallery-slide");

const previousButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");
const counter = document.querySelector("#gallery-counter");


// Check which images exist.
// If an image is missing, its designed placeholder remains visible.

slides.forEach((slide) => {
  const image = slide.querySelector("img");

  image.addEventListener("load", () => {
    slide.classList.add("has-image");
  });

  if (image.complete && image.naturalWidth > 0) {
    slide.classList.add("has-image");
  }
});


// Navigate between gallery images.

function scrollGallery(direction) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(gallery).gap) || 0;

  gallery.scrollBy({
    left: direction * (slideWidth + gap),
    behavior: "smooth"
  });
}

previousButton.addEventListener("click", () => {
  scrollGallery(-1);
});

nextButton.addEventListener("click", () => {
  scrollGallery(1);
});


// Update the image counter.

function updateCounter() {
  const galleryPosition = gallery.scrollLeft;
  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(gallery).gap) || 0;

  const currentSlide = Math.round(
    galleryPosition / (slideWidth + gap)
  ) + 1;

  counter.textContent =
    String(currentSlide).padStart(2, "0") +
    " / " +
    String(slides.length).padStart(2, "0");
}

gallery.addEventListener("scroll", updateCounter);
window.addEventListener("resize", updateCounter);

updateCounter();
