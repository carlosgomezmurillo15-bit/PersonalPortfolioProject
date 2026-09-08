const root =
  document.documentElement;


const themeButton =
  document.getElementById(
    "theme-button"
  );


const themeLabel =
  document.getElementById(
    "theme-label"
  );


/* =========================
   THEME
========================= */

function getSavedTheme() {

  try {

    return localStorage.getItem(
      "portfolio-theme"
    );

  } catch (error) {

    return null;

  }

}


function saveTheme(theme) {

  try {

    localStorage.setItem(
      "portfolio-theme",
      theme
    );

  } catch (error) {

    // Site still works without
    // browser storage.

  }

}


const savedTheme =
  getSavedTheme();


if (
  savedTheme === "dark" ||
  savedTheme === "light"
) {

  root.dataset.theme =
    savedTheme;

}


function updateThemeLabel() {

  if (!themeLabel) {
    return;
  }


  themeLabel.textContent =
    root.dataset.theme === "dark"
      ? "Light view"
      : "Dark view";

}


updateThemeLabel();


if (themeButton) {

  themeButton.addEventListener(
    "click",
    function () {

      root.dataset.theme =
        root.dataset.theme === "dark"
          ? "light"
          : "dark";


      saveTheme(
        root.dataset.theme
      );


      updateThemeLabel();

    }
  );

}


/* =========================
   ACTIVE NAVIGATION
========================= */

const currentPage =
  window.location.pathname
    .split("/")
    .pop() ||
  "index.html";


let currentNav =
  "home";


if (
  currentPage ===
  "projects.html"
) {

  currentNav =
    "projects";

} else if (
  currentPage ===
  "about.html"
) {

  currentNav =
    "about";

} else if (
  currentPage ===
  "resume.html"
) {

  currentNav =
    "resume";

}


document
  .querySelectorAll(
    "[data-nav]"
  )
  .forEach(
    function (link) {

      if (
        link.dataset.nav ===
        currentNav
      ) {

        link.classList.add(
          "active"
        );

      }

    }
  );


/* =========================
   COMING SOON BUTTONS
========================= */

document
  .querySelectorAll(
    "[data-coming-soon]"
  )
  .forEach(
    function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

        }
      );

    }
  );


/* =========================
   PROJECT FILTERS
========================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );


const projectRows =
  document.querySelectorAll(
    ".project-row[data-category]"
  );


const filterStatus =
  document.getElementById(
    "filter-status"
  );


const categoryNames = {

  security:
    "Security Operations",

  intelligence:
    "Intelligence",

  coursework:
    "Coursework"

};


function showCategory(category) {

  projectRows.forEach(
    function (project) {

      project.hidden =
        project.dataset.category !==
        category;

    }
  );


  filterButtons.forEach(
    function (button) {

      const active =
        button.dataset.filter ===
        category;


      button.classList.toggle(
        "active",
        active
      );


      button.setAttribute(
        "aria-pressed",
        active
          ? "true"
          : "false"
      );

    }
  );


  if (filterStatus) {

    filterStatus.textContent =
      "Showing " +
      categoryNames[category];

  }

}


filterButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        const category =
          button.dataset.filter;


        showCategory(
          category
        );


        const url =
          new URL(
            window.location.href
          );


        url.searchParams.set(
          "skill",
          category
        );


        history.replaceState(
          {},
          "",
          url.pathname +
          "?" +
          url.searchParams.toString()
        );

      }
    );

  }
);


/* =========================
   DIRECT CATEGORY LINKS
========================= */

if (
  projectRows.length > 0
) {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const requestedCategory =
    params.get(
      "skill"
    );


  const validCategories = [
    "security",
    "intelligence",
    "coursework"
  ];


  if (
    requestedCategory &&
    validCategories.includes(
      requestedCategory
    )
  ) {

    showCategory(
      requestedCategory
    );

  } else {

    showCategory(
      "security"
    );

  }

}
