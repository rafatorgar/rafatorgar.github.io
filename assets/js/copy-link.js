// Copy link functionality
document.addEventListener('DOMContentLoaded', function() {
  const copyBtn = document.getElementById('copy-link-btn');
  
  if (!copyBtn) return;

  const linkIcon = copyBtn.querySelector('.link-icon');
  const checkIcon = copyBtn.querySelector('.check-icon');

  copyBtn.addEventListener('click', async function() {
    try {
      // Copy current URL to clipboard
      await navigator.clipboard.writeText(window.location.href);
      
      // Show check icon
      linkIcon.style.display = 'none';
      checkIcon.style.display = 'block';
      
      // Reset after 2 seconds
      setTimeout(() => {
        linkIcon.style.display = 'block';
        checkIcon.style.display = 'none';
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  });
});
