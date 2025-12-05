// Table of Contents functionality
document.addEventListener("DOMContentLoaded", function () {
  const tocNav = document.getElementById("toc-nav");
  const tocLines = document.getElementById("toc-lines");
  const tocContent = document.getElementById("toc-content");
  const article = document.querySelector(
    '.page-content[itemprop="articleBody"]'
  );

  if (!article || !tocNav) return;

  // Get all headings (h2, h3)
  const headings = article.querySelectorAll("h2, h3");

  if (headings.length === 0) {
    tocNav.style.display = "none";
    return;
  }

  // Build TOC structure
  headings.forEach((heading, index) => {
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent.trim();
    const id = heading.id || `heading-${index}`;

    if (!heading.id) {
      heading.id = id;
    }

    // Create line indicator
    const line = document.createElement("div");
    line.className = `toc-line ${level}`;
    line.dataset.target = id;
    tocLines.appendChild(line);

    // Create content item
    const item = document.createElement("a");
    item.className = `toc-item ${level}`;
    item.href = `#${id}`;
    item.textContent = text;
    item.dataset.target = id;

    item.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        const offset = 100; // Adjust for fixed header
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });

    tocContent.appendChild(item);
  });

  // Track scroll position and highlight current section
  let isScrolling;
  function updateActiveSection() {
    let current = "";
    const scrollPosition = window.scrollY + 150;

    headings.forEach((heading) => {
      const sectionTop = heading.offsetTop;
      if (scrollPosition >= sectionTop) {
        current = heading.id;
      }
    });

    // Remove all active classes
    document.querySelectorAll(".toc-line, .toc-item").forEach((el) => {
      el.classList.remove("active");
    });

    // Add active class to current section
    if (current) {
      const activeLine = tocLines.querySelector(`[data-target="${current}"]`);
      const activeItem = tocContent.querySelector(`[data-target="${current}"]`);

      if (activeLine) activeLine.classList.add("active");
      if (activeItem) activeItem.classList.add("active");
    }
  }

  // Update on scroll with debounce
  window.addEventListener("scroll", function () {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(updateActiveSection, 50);
  });

  // Initial update
  updateActiveSection();
});
