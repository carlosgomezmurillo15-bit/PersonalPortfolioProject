const root =
  document.documentElement;

const themeButton =
  document.querySelector("#theme-button");

const themeLabel =
  document.querySelector("#theme-label");

const filterButtons =
  document.querySelectorAll(".filter-button");

const projectCards =
  document.querySelectorAll(".project-card");

const filterStatus =
  document.querySelector("#filter-status");

function updateThemeButton() {
  const currentTheme =
    root.dataset.theme;

  const nextTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  const formattedTheme =
    nextTheme.charAt(0).toUpperCase() +
    nextTheme.slice(1);

  themeLabel.textContent =
    `${formattedTheme} mode`;

  themeButton.setAttribute(
    "aria-label",
    `Switch to ${nextTheme} mode`
  );
}

const savedTheme =
  localStorage.getItem("portfolio-theme");

if (
  savedTheme === "light" ||
  savedTheme === "dark"
) {
  root.dataset.theme =
    savedTheme;
}

updateThemeButton();

themeButton.addEventListener(
  "click",
  () => {
    const nextTheme =
      root.dataset.theme === "dark"
        ? "light"
        : "dark";

    root.dataset.theme =
      nextTheme;

    localStorage.setItem(
      "portfolio-theme",
      nextTheme
    );

    updateThemeButton();
  }
);

filterButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      const selectedFilter =
        button.dataset.filter;

      let visibleProjects = 0;

      filterButtons.forEach(
        (filterButton) => {
          const isSelected =
            filterButton === button;

          filterButton.setAttribute(
            "aria-pressed",
            String(isSelected)
          );
        }
      );

      projectCards.forEach((card) => {
        const matchesFilter =
          selectedFilter === "all" ||
          card.dataset.category ===
            selectedFilter;

        card.hidden =
          !matchesFilter;

        if (matchesFilter) {
          visibleProjects += 1;

          card.classList.remove(
            "card-reveal"
          );

          void card.offsetWidth;

          card.classList.add(
            "card-reveal"
          );
        }
      });

      if (selectedFilter === "all") {
        filterStatus.textContent =
          `Showing all ${visibleProjects} projects`;
      } else {
        const categoryName =
          button.textContent.trim();

        const projectWord =
          visibleProjects === 1
            ? "project"
            : "projects";

        filterStatus.textContent =
          `Showing ${visibleProjects} ${categoryName} ${projectWord}`;
      }
    }
  );
});
