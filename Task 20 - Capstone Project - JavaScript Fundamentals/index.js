// Carousel flip through
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, idx) => {
    if (idx === index) {
      testimonial.style.display = "block";
    } else {
      testimonial.style.display = "none";
    }
  });
}

function nextTestimonial() {
  currentTestimonial++;
  if (currentTestimonial >= testimonials.length) {
    currentTestimonial = 0;
  }
  showTestimonial(currentTestimonial);
}

// Show the first testimonial initially
showTestimonial(currentTestimonial);

// Automatically switch testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

//Disappearing Images
$(document).ready(function () {
  // Attach click event handler to images
  $(".service-image").click(function () {
    // Hide the clicked image
    $(this).hide();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const saveButtons = document.querySelectorAll(".save-for-later-button");

  saveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const title = this.getAttribute("data-title");
      const image = this.getAttribute("data-image");

      let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
      savedItems.push({ id, title, image });
      localStorage.setItem("savedItems", JSON.stringify(savedItems));

      alert(
        `You have ${savedItems.length} item(s) in your "Save for later" folder.`
      );
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const savedItemsContainer = document.getElementById("saved-items-container");
  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  if (savedItems.length === 0) {
    savedItemsContainer.innerHTML = "<p>No items saved for later.</p>";
  } else {
    savedItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("saved-item");

      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      itemImage.alt = item.title;
      itemImage.width = 300;
      itemImage.height = 300;

      const itemTitle = document.createElement("h3");
      itemTitle.textContent = item.title;

      itemElement.appendChild(itemImage);
      itemElement.appendChild(itemTitle);

      savedItemsContainer.appendChild(itemElement);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const likeForms = document.querySelectorAll(".like-form");

  // Load like counts from localStorage
  likeForms.forEach((form) => {
    const id = form.getAttribute("data-id");
    const likeCount = localStorage.getItem(`likes_${id}`) || 0;
    const likeCountElement = form.querySelector(".like-count");
    likeCountElement.textContent = likeCount;

    if (parseInt(likeCount) > 0) {
      likeCountElement.style.display = "inline"; // Show the like count if greater than 0
    }
  });

  likeForms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const id = form.getAttribute("data-id");
      let likeCount = localStorage.getItem(`likes_${id}`) || 0;
      likeCount = parseInt(likeCount) + 1;

      localStorage.setItem(`likes_${id}`, likeCount);
      const likeCountElement = form.querySelector(".like-count");
      likeCountElement.textContent = likeCount;
      likeCountElement.style.display = "inline"; // Show the like count when liked
    });
  });
});
