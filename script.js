// ===== NAVBAR HAMBURGER TOGGLE =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// ===== GALLERY IMAGE SWITCH =====
const displayedImg = document.getElementById("displayed-img");
const thumbnails = document.querySelectorAll(".thumbnails img");

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener("click", () => {
    displayedImg.src = thumbnail.src;
  });
});


// ===== TO-DO LIST FUNCTIONALITY =====
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a task to DOM
function addTaskToDOM(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  if (completed) li.classList.add("completed");

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  // Toggle complete on click
  li.addEventListener("click", (e) => {
    if (e.target !== deleteBtn) {
      li.classList.toggle("completed");
      saveTasks();
    }
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Add task event
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTaskToDOM(text);
    saveTasks();
    taskInput.value = "";
  }
});

// Load tasks on page load
window.addEventListener("load", loadTasks);


// ===== CONTACT FORM VALIDATION =====
const form = document.getElementById("contactForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !password || !confirm || !message) {
    errorMsg.textContent = "⚠️ Please fill in all fields.";
    return;
  }

  if (password !== confirm) {
    errorMsg.textContent = "⚠️ Passwords do not match!";
    return;
  }

  errorMsg.style.color = "green";
  errorMsg.textContent = "✅ Message sent successfully!";
  form.reset();

  // Reset error message color after 3 seconds
  setTimeout(() => {
    errorMsg.textContent = "";
    errorMsg.style.color = "red";
  }, 3000);
});


// ===== DYNAMIC SEARCH / FILTER FUNCTIONALITY =====
const movies = [
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Avengers: Endgame",
  "Spirited Away",
  "Coco",
  "Parasite",
  "The Lion King",
  "Frozen II",
  "The Matrix"
];

const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");

// Display movies in the list
function displayMovies(list) {
  movieList.innerHTML = "";
  if (list.length === 0) {
    movieList.innerHTML = "<li>No matches found</li>";
    return;
  }
  list.forEach(movie => {
    const li = document.createElement("li");
    li.textContent = movie;
    movieList.appendChild(li);
  });
}

// Initial load of movies
displayMovies(movies);

// Filter movies on input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = movies.filter(movie => movie.toLowerCase().includes(query));
  displayMovies(filtered);
});


// ===== FADE-IN ON SCROLL =====
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
