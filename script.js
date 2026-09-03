const root = document.documentElement;
const themeButton = document.querySelector("#theme-button");
const themeLabel = document.querySelector("#theme-label");

const filterButtons =
  document.querySelectorAll(".filter-button");

const projectRows =
  document.querySelectorAll(".project-row");

const filterStatus =
  document.querySelector("#filter-status");

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

function updateThemeButton() {
  const nextTheme =
    root.dataset.theme === "dark" ? "light" : "dark";

  const buttonText =
    nextTheme === "dark" ? "Dark view" : "Light view";

  themeLabel.textContent = buttonText;

  themeButton.setAttribute(
    "aria-label",
    `Switch to ${nextTheme} theme`
  );
}

const savedTheme = readSavedTheme();

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  const nextTheme =
    root.dataset.theme === "dark" ? "light" : "dark";

  root.dataset.theme = nextTheme;

  saveTheme(nextTheme);
  updateThemeButton();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleProjects = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;

      filterButton.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

    projectRows.forEach((project) => {
      const matchesFilter =
        selectedFilter === "all" ||
        project.dataset.category === selectedFilter;

      project.hidden = !matchesFilter;

      if (matchesFilter) {
        visibleProjects += 1;

        project.classList.remove("is-entering");

        void project.offsetWidth;

        project.classList.add("is-entering");
      }
    });

    if (selectedFilter === "all") {
      filterStatus.textContent =
        `Showing all ${visibleProjects} projects`;

      return;
    }

    const categoryName = button.textContent.trim();

    const projectWord =
      visibleProjects === 1 ? "project" : "projects";

    filterStatus.textContent =
      `Showing ${visibleProjects} ${categoryName} ${projectWord}`;
  });
});
