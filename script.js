// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle scroll events
  function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add('fade-in');
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Trigger scroll event on page load to check for elements already in view
  window.addEventListener('load', handleScroll);
  // Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification();
  }).catch((err) => {
    console.error("Failed to copy text: ", err);
  });
}

// Function to show the notification
function showNotification() {
  const notification = document.getElementById("notification");
  notification.classList.add("show");

  // Hide the notification after 2 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Add click event listeners to social media links
document.addEventListener("DOMContentLoaded", () => {
  const discordLink = document.querySelector(".creator-link[href*='discord']");
  if (discordLink) {
    discordLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the link from navigating
      copyToClipboard("Flux#1234"); // Replace with the actual Discord username
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  // Toggle folder content visibility
  const folders = document.querySelectorAll('.folder');
  folders.forEach(folder => {
      folder.addEventListener('click', function () {
          this.classList.toggle('active');
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', !isExpanded);

          // Smoothly animate folder content
          const folderContent = this.querySelector('.folder-content');
          if (folderContent.style.maxHeight) {
              folderContent.style.maxHeight = null;
          } else {
              folderContent.style.maxHeight = folderContent.scrollHeight + 'px';
          }
      });
  });

  // Switch content sections when a file is clicked
  const files = document.querySelectorAll('.file');
  const contentSections = document.querySelectorAll('.content-section');

  files.forEach(file => {
      file.addEventListener('click', function () {
          const targetId = this.getAttribute('data-file');
          
          // Hide all content sections
          contentSections.forEach(section => {
              section.classList.remove('active');
          });

          // Show the target content section
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              targetSection.classList.add('active');
          }

          // Update breadcrumb
          const breadcrumbPaths = document.querySelectorAll('.breadcrumb-path');
          breadcrumbPaths[1].textContent = targetId.replace(/-/g, ' '); // Update the second breadcrumb path
      });
  });

  // TOC navigation
  const tocItems = document.querySelectorAll('.toc-item');
  tocItems.forEach(item => {
      item.addEventListener('click', function () {
          const targetId = this.getAttribute('data-target');
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              // Hide all content sections
              contentSections.forEach(section => {
                  section.classList.remove('active');
              });

              // Show the target content section
              targetSection.classList.add('active');

              // Update breadcrumb
              const breadcrumbPaths = document.querySelectorAll('.breadcrumb-path');
              breadcrumbPaths[1].textContent = targetId.replace(/-/g, ' '); // Update the second breadcrumb path
          }
      });
  });

  // Go Home button
  const goHomeButton = document.querySelector('.go-home-button');
  goHomeButton.addEventListener('click', function () {
      // Hide all content sections
      contentSections.forEach(section => {
          section.classList.remove('active');
      });

      // Reset breadcrumb
      const breadcrumbPaths = document.querySelectorAll('.breadcrumb-path');
      breadcrumbPaths[1].textContent = 'Resources'; // Reset the second breadcrumb path
  });

  // Show/hide floating TOC on scroll
  const floatingToc = document.querySelector('.floating-toc');
  window.addEventListener('scroll', function () {
      if (window.scrollY > 200) {
          floatingToc.classList.add('visible');
      } else {
          floatingToc.classList.remove('visible');
      }
  });
});