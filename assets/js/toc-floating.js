// Floating Table of Contents
document.addEventListener("DOMContentLoaded", function () {
  const article = document.querySelector(
    '.page-content[itemprop="articleBody"]'
  );
  const tocFloating = document.querySelector(".toc-floating");
  const tocLines = document.querySelector(".toc-lines");
  const tocList = document.querySelector(".toc-list");

  if (!article || !tocFloating) return;

  // Get all headings (h2, h3)
  const headings = article.querySelectorAll("h2, h3");

  if (headings.length === 0) {
    tocFloating.style.display = "none";
    return;
  }

  // Build TOC structure
  headings.forEach((heading, index) => {
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent;
    const id = heading.id || `heading-${index}`;

    if (!heading.id) {
      heading.id = id;
    }

    // Create line for collapsed state
    const line = document.createElement("div");
    line.className = `toc-line toc-line-${level}`;
    line.dataset.target = id;
    tocLines.appendChild(line);

    // Create list item for expanded state
    const li = document.createElement("li");
    li.className = `toc-item toc-item-${level}`;

    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = text;
    a.dataset.target = id;

    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Smooth scroll on click
  tocFloating.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const targetId = e.target.dataset.target;
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });

  // Highlight current section on scroll
  let ticking = false;

  function updateActiveSection() {
    const scrollPos = window.scrollY + 100;

    let currentHeading = null;
    headings.forEach((heading) => {
      if (heading.offsetTop <= scrollPos) {
        currentHeading = heading;
      }
    });

    // Remove all active classes
    tocLines
      .querySelectorAll(".toc-line")
      .forEach((line) => line.classList.remove("active"));
    tocList
      .querySelectorAll(".toc-item")
      .forEach((item) => item.classList.remove("active"));

    // Add active class to current section
    if (currentHeading) {
      const id = currentHeading.id;
      const activeLine = tocLines.querySelector(`[data-target="${id}"]`);
      const activeItem = tocList.querySelector(`[data-target="${id}"]`);

      if (activeLine) activeLine.classList.add("active");
      if (activeItem) activeItem.parentElement.classList.add("active");
    }

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveSection);
      ticking = true;
    }
  });

  // Initial update
  updateActiveSection();
});
