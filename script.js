document.documentElement.classList.add("js");

const root = document.documentElement;
const themeButton = document.querySelector("#theme-button");
const themeLabel = document.querySelector("#theme-label");

function readSavedTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // The theme still works if browser storage is unavailable.
  }
}

function updateThemeControl() {
  if (!themeButton || !themeLabel) return;

  const darkThemeIsActive = root.dataset.theme === "dark";

  themeLabel.textContent = darkThemeIsActive ? "Light" : "Dark";

  themeButton.setAttribute(
    "aria-label",
    darkThemeIsActive
      ? "Switch to light theme"
      : "Switch to dark theme"
  );
}

const savedTheme = readSavedTheme();

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

updateThemeControl();

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    saveTheme(nextTheme);
    updateThemeControl();
  });
}

const pageFile =
  window.location.pathname.split("/").pop() || "index.html";

const pageNames = {
  "index.html": "home",
  "projects.html": "projects",
  "about.html": "about",
  "resume.html": "resume"
};

const activePage = pageNames[pageFile] || "home";

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === activePage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const filterButtons = [
  ...document.querySelectorAll(".filter-button")
];

const projectRows = [
  ...document.querySelectorAll("[data-category]")
];

const filterStatus = document.querySelector("#filter-status");

const categoryDetails = {
  security: {
    name: "Security Operations",
    count: 3
  },
  intelligence: {
    name: "Intelligence",
    count: 3
  },
  coursework: {
    name: "Coursework",
    count: 4
  }
};

function showCategory(category) {
  if (!categoryDetails[category]) return;

  projectRows.forEach((project) => {
    project.hidden = project.dataset.category !== category;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (filterStatus) {
    const details = categoryDetails[category];

    filterStatus.textContent =
      `Showing ${details.name} · ${details.count} projects`;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("skill", category);

  history.replaceState(
    {},
    "",
    `${url.pathname}?${url.searchParams.toString()}`
  );
}

if (filterButtons.length && projectRows.length) {
  const requestedCategory =
    new URLSearchParams(window.location.search).get("skill");

  const startingCategory =
    categoryDetails[requestedCategory]
      ? requestedCategory
      : "security";

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showCategory(button.dataset.filter);
    });
  });

  showCategory(startingCategory);
}

const revealItems = document.querySelectorAll(".reveal");

const reducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (
  reducedMotion ||
  !("IntersectionObserver" in window)
) {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}
