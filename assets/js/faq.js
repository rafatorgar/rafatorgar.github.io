// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      // Close all other FAQs
      faqQuestions.forEach(function (q) {
        q.classList.remove("active");
        q.nextElementSibling.classList.remove("active");
      });

      // Toggle current FAQ
      if (!isActive) {
        this.classList.add("active");
        answer.classList.add("active");
      }
    });
  });
});
