// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(function(button) {
    button.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQs
      faqQuestions.forEach(function(q) {
        q.setAttribute('aria-expanded', 'false');
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });
      
      // Toggle current FAQ
      if (!isExpanded) {
        this.setAttribute('aria-expanded', 'true');
        this.classList.add('active');
        answer.classList.add('active');
      }
    });
  });
});
