// Elements
const blogForm = document.getElementById('blog-form');
const usernameInput = document.getElementById('username');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const errorMessage = document.getElementById('error-message');
const landingPage = document.getElementById('landing-page');
const postsPage = document.getElementById('posts-page');
const postsContainer = document.getElementById('posts-container');
const backButton = document.getElementById('back-button');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>By ${post.username}</small>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Toggle between landing and posts page
function togglePage(page) {
    if (page === 'posts') {
        landingPage.classList.add('hidden');
        postsPage.classList.remove('hidden');
        loadPosts();
    } else {
        landingPage.classList.remove('hidden');
        postsPage.classList.add('hidden');
    }
}

// Form submission
blogForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!username || !title || !content) {
        errorMessage.textContent = 'Please fill out all fields.';
        return;
    }

    // Get existing posts from localStorage
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Add new post to the array
    posts.push({ username, title, content });

    // Save back to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // Clear the form and show the posts page
    usernameInput.value = '';
    titleInput.value = '';
    contentInput.value = '';
    errorMessage.textContent = '';
    togglePage('posts');
});

// Back button event
backButton.addEventListener('click', function() {
    togglePage('landing');
});

// Dark mode toggle
darkModeToggle.addEventListener('change', function() {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Load initial posts
loadPosts();
