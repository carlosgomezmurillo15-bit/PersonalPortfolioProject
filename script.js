const themeButton = document.querySelector("#theme-button");
const currentYear = document.querySelector("#current-year");

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector("#filter-status");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const lightThemeIsActive =
    document.body.classList.contains("light-theme");

  themeButton.textContent =
    lightThemeIsActive ? "Dark mode" : "Light mode";
});

currentYear.textContent = new Date().getFullYear();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleProjects = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;

      filterButton.setAttribute(
        "aria-pressed",
        isSelected.toString()
      );
    });

    projectCards.forEach((card) => {
      const matchesFilter =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.hidden = !matchesFilter;

      if (matchesFilter) {
        visibleProjects += 1;
      }
    });

    if (selectedFilter === "all") {
      filterStatus.textContent =
        `Showing all ${visibleProjects} projects.`;
    } else {
      const categoryName = button.textContent.trim();
      const projectWord =
        visibleProjects === 1 ? "project" : "projects";

      filterStatus.textContent =
        `Showing ${visibleProjects} ${categoryName} ${projectWord}.`;
    }
  });
});
