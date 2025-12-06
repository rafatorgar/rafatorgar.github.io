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
        const otherAnswer = q.nextElementSibling;
        otherAnswer.classList.remove("active");
        otherAnswer.style.maxHeight = null;
      });

      // Toggle current FAQ
      if (!isActive) {
        this.classList.add("active");
        answer.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
