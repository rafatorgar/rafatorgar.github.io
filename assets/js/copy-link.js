// Copy Link Button functionality
document.addEventListener('DOMContentLoaded', function() {
  const copyBtn = document.querySelector('.copy-link-btn');
  
  if (!copyBtn) return;
  
  copyBtn.addEventListener('click', async function() {
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      
      // Add copied class for animation
      copyBtn.classList.add('copied');
      
      // Remove class after animation
      setTimeout(() => {
        copyBtn.classList.remove('copied');
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  });
});
