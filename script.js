const html = document.documentElement;
const switchInput = document.getElementById("switchCheckDefault");

// Load saved theme from localStorage (if any)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-bs-theme", savedTheme);
  switchInput.checked = savedTheme === "dark";
} else {
  // If no saved theme, follow system preference (auto)
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  html.setAttribute("data-bs-theme", prefersDark ? "dark" : "light");
  switchInput.checked = prefersDark;
}

// Toggle theme and save to localStorage
switchInput.addEventListener("change", () => {
  const theme = switchInput.checked ? "dark" : "light";
  html.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
});

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page-container");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // stop page refresh

    // Remove active class from all links
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");

    // Hide all pages
    pages.forEach((p) => p.classList.add("d-none"));

    // Show the selected page
    const targetId = this.getAttribute("data-target");
    document.getElementById(targetId).classList.remove("d-none");
  });
});

GitHubCalendar(".calendar", "GeraldManongdo");

// or enable responsive functionality:
GitHubCalendar(".calendar", "GeraldManongdo", { responsive: true });

// Use a proxy
GitHubCalendar(".calendar", "GeraldManongdo", {
  proxy(username) {
    return fetch(`https://your-proxy.com/github?user=${username}`);
  },
}).then((r) => r.text());
